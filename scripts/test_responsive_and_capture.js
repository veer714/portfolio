import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runTestsAndCapture() {
  console.log('Launching browser to test and capture responsive screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Breakpoints test matrix
  const breakpoints = [
    { name: 'desktop-1440', width: 1440, height: 900, isMobile: false },
    { name: 'laptop-1024', width: 1024, height: 768, isMobile: false },
    { name: 'tablet-768', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'mobile-430', width: 430, height: 932, isMobile: true, hasTouch: true },
    { name: 'mobile-390', width: 390, height: 844, isMobile: true, hasTouch: true },
    { name: 'mobile-360', width: 360, height: 740, isMobile: true, hasTouch: true },
  ];

  for (const bp of breakpoints) {
    console.log(`Checking layout at ${bp.name} (${bp.width}x${bp.height})...`);
    await page.setViewport(bp);
    await page.goto('http://localhost:5173/?tab=about.md', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));
    
    // Check horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(` > ${bp.name} horizontal overflow: ${hasHorizontalOverflow ? 'FAIL' : 'PASS (Clean)'}`);
  }

  // Captures
  const captures = [
    {
      name: 'desktop-home.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'desktop-projects.png',
      url: 'http://localhost:5173/?tab=projects',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'project-detail.png',
      url: 'http://localhost:5173/?tab=api-sentinel.tsx',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'desktop-skills.png',
      url: 'http://localhost:5173/?tab=skills.json',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'lab-simulation.png',
      url: 'http://localhost:5173/?tab=neural-playground.tsx',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'terminal.png',
      url: 'http://localhost:5173/?tab=about.md&terminal=true',
      viewport: { width: 1440, height: 900 },
      action: async (p) => {
        try {
          const input = await p.$('input[type="text"]');
          if (input) {
            await input.type('help');
            await p.keyboard.press('Enter');
            await new Promise(r => setTimeout(r, 300));
          }
        } catch (e) {}
      }
    },
    {
      name: 'command-palette.png',
      url: 'http://localhost:5173/?tab=about.md&palette=true',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'contact.png',
      url: 'http://localhost:5173/?tab=contact.md',
      viewport: { width: 1440, height: 900 }
    },
    {
      name: 'mobile-home.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 390, height: 844, isMobile: true, hasTouch: true }
    },
    {
      name: 'mobile-sidebar.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
      action: async (p) => {
        const btn = await p.$('button[title="Toggle Explorer"]');
        if (btn) {
          await btn.click();
          await new Promise(r => setTimeout(r, 400));
        }
      }
    },
    {
      name: 'mobile-projects.png',
      url: 'http://localhost:5173/?tab=projects',
      viewport: { width: 390, height: 844, isMobile: true, hasTouch: true }
    },
    {
      name: 'mobile-360px.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 360, height: 740, isMobile: true, hasTouch: true }
    }
  ];

  for (const item of captures) {
    console.log(`Capturing ${item.name}...`);
    await page.setViewport(item.viewport);
    await page.goto(item.url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    if (item.action) {
      await item.action(page);
    }
    const dest = path.join(screenshotDir, item.name);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
  }

  await browser.close();
  console.log('Testing completed with ' + consoleErrors.length + ' console errors.');
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }
}

runTestsAndCapture().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
