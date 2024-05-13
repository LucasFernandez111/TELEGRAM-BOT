const puppeteer = require("puppeteer");

const getPageData = async (urlList) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--incognito", "--no-sandbox"],
  });
  const imageClass = ".magnifier--image--L4hZ4dC";

  try {
    const data = await Promise.all(
      urlList.map(async (url) => {
        console.log(url);
        const page = await browser.newPage();
        await page.goto(url, { timeout: 60000 });
        await page.setRequestInterception(true);

        page.on("request", (request) => {
          if (
            request.resourceType() === "document" ||
            request.resourceType() === "script"
          )
            request.continue();
          else request.abort();
        });
        await page.waitForSelector(".magnifier--image--L4hZ4dC", {
          timeout: 60000,
        });
        const titleFull = await page.title();
        const title = titleFull.split(",", 1)[0];

        const imageUrl = await page.$eval(imageClass, (img) => img.src);

        console.log({ title, imageUrl });

        return {
          title,
          imageUrl,
          url,
        };
      })
    );

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }

  // await page.goto(url);

  // const titleFull = await page.title();

  // if (titleFull == "Page Not Found - Aliexpress.com") {
  //   await browser.close();
  //   throw new Error("Hubo un error en el enlace o Internet");
  // }

  // await page.waitForSelector(
  //   ".magnifier--image--L4hZ4dC.magnifier--zoom--ZrD3Iv8"
  // );

  // const titleSplit = titleFull.split(",", 1);

  // const title = titleSplit[0];

  // const imageUrl = await page.$eval(imageClass, (img) => img.src);

  // await browser.close();

  // return {
  //   title,
  //   imageUrl,
  // };
};

module.exports = { getPageData };
