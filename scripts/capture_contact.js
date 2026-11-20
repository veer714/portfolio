import puppeteer from 'puppeteer';
import path from 'path';

async function captureContact() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/?tab=contact.md', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const dest = path.resolve('screenshots/contact.png');
  await page.screenshot({ path: dest });
  console.log('Captured contact to', dest);
  await browser.close();
}

captureContact().catch(console.error);

