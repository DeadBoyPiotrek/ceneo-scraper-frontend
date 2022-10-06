let chrome = {};
let puppeteer;

const url = 'https://www.ceneo.pl/';
//! change this to something else 😵🐊
const item = 'rtx 3060';
//! change this to something else 😵🐊

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

export const getPrice = async (req, res) => {
  let options = {
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  };

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
  try {
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    );

    await page.goto(url);
    const pageTitle = await page.title();

    //! Wont work cuz execution exceeds Vercel serverless function max execution time (10s)

    // await page.focus('#form-head-search-q');
    // await page.keyboard.type(item);
    // await page.keyboard.press('Tab');
    // await page.keyboard.press('Enter');
    // await page.waitForSelector('.js_seoUrl');
    // const photo1 = await page.screenshot({});
    // await page.click('.js_seoUrl');
    // await page.waitForTimeout(500);
    // const photo2 = await page.screenshot({});
    // const photo1base64 = await photo1.toString('base64');
    // const photo2base64 = await photo1.toString('base64');
    // await browser.close();
    // return { photo1base64, photo2base64 };

    //! Wont work cuz execution exceeds Vercel serverless function max execution time (10s)

    return { photo1base64: pageTitle, photo2base64: pageTitle };
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
