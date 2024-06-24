const { timeout } = require("puppeteer");

const taskYupoo = async (page, url, codes) => {
  try {
    await page.goto(`${url}search/album?uid=1&sort=&q=${codes}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector(".album__title").catch(() => {
      throw Error(`No se encontro el elemento ${codes}`);
    });
    await page.waitForSelector("a.album__main");

    return await Promise.all(
      codes.map(async (code) => {
        const element = await page.$(`a[title="${code}"]`);

        const href = await page.evaluate((el) => el.href, element);
        const titleCode = await page.evaluate((el) => el.title, element);

        return { titleCode, href };
      })
    );
  } catch (err) {
    console.log(err);
    throw Error(`No se encontraron los elementos ${codes} de ${url}`);
  }
};

module.exports = taskYupoo;
