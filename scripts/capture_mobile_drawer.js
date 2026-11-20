import puppeteer from 'puppeteer';
import path from 'path';

async function captureMobileDrawer() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/?tab=about.md', { waitUntil: 'networkidle0' });

  // Click the hamburger menu button
  const menuBtn = await page.$('button[title="Toggle Explorer"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }

  const dest = path.resolve('screenshots/mobile-sidebar.png');
  await page.screenshot({ path: dest });
  console.log('Captured mobile drawer to', dest);
  await browser.close();
}

captureMobileDrawer().catch(console.error);

