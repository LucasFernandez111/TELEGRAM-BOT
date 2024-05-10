const puppeteer = require("puppeteer");

const getPageData = async (url) => {
  const browser = await puppeteer.launch();
  const imageClass = ".magnifier--image--L4hZ4dC.magnifier--zoom--ZrD3Iv8";

  const page = await browser.newPage();

  await page.goto(url);

  const titleFull = await page.title();

  if (titleFull == "Page Not Found - Aliexpress.com") {
    await browser.close();
    throw new Error("Hubo un error en el enlace o Internet");
  }

  await page.waitForSelector(
    ".magnifier--image--L4hZ4dC.magnifier--zoom--ZrD3Iv8"
  );

  const titleSplit = titleFull.split(",", 1);

  const title = titleSplit[0];

  const imageUrl = await page.$eval(imageClass, (img) => img.src);

  await browser.close();

  return {
    title,
    imageUrl,
  };
};

module.exports = { getPageData };
