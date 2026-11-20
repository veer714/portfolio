import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser for portfolio screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const captures = [
    {
      name: 'desktop-home.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 1440, height: 900 },
      action: async () => {}
    },
    {
      name: 'desktop-projects.png',
      url: 'http://localhost:5173/?tab=projects',
      viewport: { width: 1440, height: 900 },
      action: async () => {}
    },
    {
      name: 'project-detail.png',
      url: 'http://localhost:5173/?tab=api-sentinel.tsx',
      viewport: { width: 1440, height: 900 },
      action: async () => {}
    },
    {
      name: 'desktop-skills.png',
      url: 'http://localhost:5173/?tab=skills.json',
      viewport: { width: 1440, height: 900 },
      action: async () => {}
    },
    {
      name: 'terminal.png',
      url: 'http://localhost:5173/?tab=about.md&terminal=true',
      viewport: { width: 1440, height: 900 },
      action: async (p) => {
        // Type 'help' in terminal
        try {
          const input = await p.$('input[type="text"]');
          if (input) {
            await input.type('help');
            await p.keyboard.press('Enter');
            await new Promise(r => setTimeout(r, 400));
          }
        } catch (e) {
          console.log('Terminal action warning:', e.message);
        }
      }
    },
    {
      name: 'command-palette.png',
      url: 'http://localhost:5173/?tab=about.md&palette=true',
      viewport: { width: 1440, height: 900 },
      action: async () => {}
    },
    {
      name: 'mobile-home.png',
      url: 'http://localhost:5173/?tab=about.md',
      viewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
      action: async () => {}
    }
  ];

  for (const item of captures) {
    console.log(`Capturing ${item.name}...`);
    await page.setViewport(item.viewport);
    await page.goto(item.url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600)); // allow font and motion transitions to settle
    if (item.action) {
      await item.action(page);
    }
    const dest = path.join(screenshotDir, item.name);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
  }

  await browser.close();
  console.log('All portfolio screenshots successfully captured!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});

