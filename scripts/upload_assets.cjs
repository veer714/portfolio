const fs = require('fs');
const path = require('path');
const { createBLAKE3 } = require('hash-wasm');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.woff2': return 'font/woff2';
    case '.woff': return 'font/woff';
    case '.ttf': return 'font/ttf';
    case '.pdf': return 'application/pdf';
    case '.ico': return 'image/x-icon';
    case '.txt': return 'text/plain; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

async function main() {
  const jwt = process.argv[2];
  if (!jwt) {
    console.error('Usage: node scripts/upload_assets.cjs <jwt>');
    process.exit(1);
  }

  const distDir = path.resolve(__dirname, '..', 'dist');
  const hasher = await createBLAKE3();

  function hashFile(filepath) {
    const base64Contents = fs.readFileSync(filepath).toString('base64');
    const extension = path.extname(filepath).substring(1);
    return hasher.init().update(base64Contents).update(extension).digest('hex').slice(0, 32);
  }

  const IGNORE_LIST = ['_worker.js', '_redirects', '_headers', '_routes.json'];

  const fileMap = new Map();

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        if (IGNORE_LIST.includes(entry.name)) {
          console.log(`Skipping special deployment file from asset hashing: ${relPath}`);
          continue;
        }
        const hash = hashFile(fullPath);
        const contentType = getContentType(fullPath);
        fileMap.set('/' + relPath, {
          path: fullPath,
          relPath: '/' + relPath,
          hash,
          contentType,
          sizeInBytes: fs.statSync(fullPath).size
        });
      }
    }
  }

  walk(distDir);
  console.log(`Discovered ${fileMap.size} static assets to process.`);

  const files = Array.from(fileMap.values());
  const hashes = files.map(f => f.hash);

  console.log('Checking missing hashes with Cloudflare Pages asset store...');
  const checkMissingRes = await fetch('https://api.cloudflare.com/client/v4/pages/assets/check-missing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({ hashes })
  });

  if (!checkMissingRes.ok) {
    const errText = await checkMissingRes.text();
    throw new Error(`Failed check-missing: ${checkMissingRes.status} ${errText}`);
  }

  const checkMissingJson = await checkMissingRes.json();
  const missingHashes = checkMissingJson.result || [];
  console.log(`Missing hashes count: ${missingHashes.length} (already present: ${hashes.length - missingHashes.length})`);

  if (missingHashes.length > 0) {
    const missingFiles = files.filter(f => missingHashes.includes(f.hash));
    const payload = missingFiles.map(file => ({
      key: file.hash,
      value: fs.readFileSync(file.path).toString('base64'),
      metadata: { contentType: file.contentType },
      base64: true
    }));

    console.log(`Uploading ${payload.length} files...`);
    const uploadRes = await fetch('https://api.cloudflare.com/client/v4/pages/assets/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(payload)
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Failed asset upload: ${uploadRes.status} ${errText}`);
    }

    const uploadJson = await uploadRes.json();
    console.log('Upload response:', uploadJson);
  }

  console.log('Upserting asset hashes...');
  const upsertRes = await fetch('https://api.cloudflare.com/client/v4/pages/assets/upsert-hashes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({ hashes })
  });

  if (!upsertRes.ok) {
    const errText = await upsertRes.text();
    console.warn(`Upsert warning: ${upsertRes.status} ${errText}`);
  } else {
    console.log('Hashes upserted successfully.');
  }

  const manifest = {};
  for (const [relPath, info] of fileMap.entries()) {
    manifest[relPath] = info.hash;
  }

  const outputPath = path.resolve(__dirname, '..', 'deployment_manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`Deployment manifest written to ${outputPath}`);
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
