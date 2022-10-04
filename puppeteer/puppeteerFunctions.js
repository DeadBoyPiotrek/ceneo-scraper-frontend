import puppeteer from 'puppeteer';

const url = 'https://www.ceneo.pl/';
//! change this to something else 😵🐊
const item = 'rtx 3060';
//! change this to something else 😵🐊

//! puppeteer
export const getPrice = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
  );
  await page.goto(url);
  await page.focus('#form-head-search-q');
  await page.keyboard.type(item);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.js_seoUrl');
  const photo1 = await page.screenshot({});
  // .toString('base64');
  await page.click('.js_seoUrl');
  await page.waitForTimeout(500);
  const photo2 = await page.screenshot({});
  // .toString('base64');

  const photo1dot2 = await photo1.toString('base64');
  const photo2dot2 = await photo2.toString('base64');
  // console.log(photo1, photo2, photo1dot2);
  // console.log(photo1dot2);

  await browser.close();
  return { photo1dot2, photo2dot2 };
};

//! puppeteer
