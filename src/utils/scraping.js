const { Cluster } = require("puppeteer-cluster");

const path = require("path");

const requestInterception = (request) => {
  if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else request.continue();
};

const taskYupoo = async (page, url, codes) => {
  await page.goto(`${url}search/album?uid=1&sort=&q=${codes}`);

  await page.waitForSelector(".album__title"); // Asegura que los elementos se han cargado
  await page.waitForSelector("a.album__main");

  return await Promise.all(
    codes.map(async (code) => {
      const element = await page.$(`a[title="${code}"]`);
      if (element) {
        const href = await page.evaluate((el) => el.href, element);
        const titleCode = await page.evaluate((el) => el.title, element);

        return { titleCode, href };
      } else {
        return null;
      }
    })
  );
};

const taskAliexpress = async (page, url, cookies) => {
  await page.setRequestInterception(true);
  await page.on("request", requestInterception);

  await page.setCookie(...cookies);

  await page.goto(url);
  const titleFull = await page.title();

  if (
    titleFull === "Page Not Found - Aliexpress.com" ||
    titleFull === "404 page"
  )
    throw Error(`${url}: Enlace caido!`);

  const title = titleFull.split(",", 1)[0];

  const divElement = await page.$(".es--wrap--vZDQqfj");

  const price = await page.evaluate(
    (element) => element.textContent,
    divElement
  );

  page.removeAllListeners("request");
  return { title, price, urlAli: url };
};

/**
 *
 * @param {Array} URL_LIST - ["http://....,http://...."]
 * @param {Array} CODE_LIST - [1242,3434,535]
 *
 */
const getPageData = async (URL_LIST, CODE_LIST, ctx = null) => {
  let dataList = [];
  const cookies = [
    {
      name: "aep_usuc_f",
      value: "site=glo&c_tp=EUR&region=ES&b_locale=es_ES",
      domain: ".aliexpress.com",
      path: "/",
    },
  ];

  const cluster = await Cluster.launch({
    puppeteerOptions: {
      args: ["--no-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: URL_LIST.length > 1 ? 2 : 1, //Si es 1 url (1 cluster)
    monitor: true,
  });

  await cluster.task(async ({ page, data: { url, code } }) => {
    if (url.includes("yupoo")) {
      dataList = await taskYupoo(page, url, CODE_LIST);

      return;
    }

    data = await taskAliexpress(page, url, cookies);

    data.code = code;
    dataList.push(data);
    return dataList;
  });
  cluster.on("taskerror", (err) => {
    console.error(`Error en la tarea para : ${err.message}`);
    if (ctx) ctx.reply(err.message);
  });

  URL_LIST.forEach((url, index) => {
    cluster.queue({ url, code: CODE_LIST[index] });
  });

  await cluster.idle();
  await cluster.close();

  return dataList;
};

const getImagePage = async ({ urls }) => {
  const listPath = [];
  const cluster = await Cluster.launch({
    puppeteerOptions: {
      args: ["--no-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: urls.length > 1 ? 2 : 1, //Si es 1 url (1 cluster)
    monitor: true,
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Aumenta la densidad de píxeles
    });
    await page.goto(url);

    await page.waitForSelector("img.autocover");

    const elementImage = await page.$("img.autocover");

    const name = url.split("/").pop().split("?")[0] + ".png";

    const pathRelative = path.resolve(__dirname, "../uploads", "images", name);

    const boundingBox = await elementImage.boundingBox();
    await page.screenshot({
      path: pathRelative,
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      },
    });

    return listPath.push(pathRelative);
  });

  urls.forEach(({ href }) => cluster.queue(href));

  await cluster.idle();
  await cluster.close();

  return listPath;
};

module.exports = { getPageData, getImagePage };
