const { Cluster } = require("puppeteer-cluster");

const requestInterception = (request) => {
  if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else request.continue();
};

const taskAliexpress = async (page) => {
  const titleFull = await page.title();

  if (
    titleFull === "Page Not Found - Aliexpress.com" ||
    titleFull === "404 page"
  )
    return null;

  const title = titleFull.split(",", 1)[0];

  const divElement = await page.$(".es--wrap--vZDQqfj");

  const price = await page.evaluate(
    (element) => element.textContent,
    divElement
  );

  page.removeAllListeners("request");
  return { title, price };
};

/**
 *
 * @param {Array} URL_LIST - ["http://....,http://...."]
 * @param {Array} CODE_LIST - [1242,3434,535]
 *
 */
const getPageData = async (URL_LIST, CODE_LIST) => {
  let dataList = [];
  const cluster = await Cluster.launch({
    puppeteerOptions: {
      args: ["--no-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: URL_LIST.length > 1 ? 2 : 1, //Si es 1 url (1 cluster)
    monitor: true,
  });

  await cluster.task(async ({ page, data: url }) => {
    if (url.includes("yupoo")) {
      await page.goto(`${url}search/album?q=${CODE_LIST}&uid=1&sort=`);
      await page.waitForNetworkIdle({ timeout: 50000 });
      await page.waitForSelector(".album__title"); // Asegura que los elementos se han cargado
      await page.waitForSelector(".album__img");
      const titleCode = await page.$$eval(".album__title", (elements) =>
        elements.map((element) => element.textContent)
      );

      const imgList = await page.$$eval(".album__img", (imgs) =>
        imgs.map((img) => img.src)
      );

      const list = imgList.map((imgURL, i) => {
        return {
          code: titleCode[i],
          imgURL,
        };
      });

      dataList = list.filter(({ imgURL }) => imgURL != "");

      return;
    }

    await page.setRequestInterception(true);
    await page.on("request", requestInterception);
    await page.goto(url);
    data = await taskAliexpress(page);

    return dataList.push(data);
  });
  cluster.on("taskerror", (err) => {
    console.error(`Error en la tarea para : ${err.message}`);
  });

  URL_LIST.forEach((url) => {
    cluster.queue(url);
  });

  await cluster.idle();
  await cluster.close();

  return dataList;
};

module.exports = { getPageData };