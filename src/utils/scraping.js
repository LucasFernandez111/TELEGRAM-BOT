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

const taskYupoo = async (page, code) => {
  const srcUrl = await page.evaluate(() => {
    // Seleccionar el elemento <img> por su clase o cualquier otro selector
    const imgElement = document.querySelector("img.album__absolute");

    // Obtener el valor del atributo src
    const src = imgElement ? imgElement.getAttribute("src") : null;

    return src;
  });

  console.log(srcUrl); // Imprimir la URL del src en la consola
};

/**
 *
 * @param {Array} URL_LIST - ["http://....,http://...."]
 *
 */
const getPageData = async (URL_LIST) => {
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
    await page.setRequestInterception(true);

    await page.on("request", requestInterception);
    await page.goto(url);

    if (url.includes("aliexpress")) {
      data = await taskAliexpress(page);
      return dataList.push(data);
    }

    await taskYupoo(page);
  });
  cluster.on("taskerror", (err, data) => {
    console.error(`Error en la tarea para : ${err.message}`);
  });
  cluster.on("taskend", (task) => {
    console.log(`Tarea finalizada para ${task.data}`);
  });

  URL_LIST.forEach((url) => {
    cluster.queue(url);
  });

  await cluster.idle();
  await cluster.close();

  return dataList;
};

module.exports = { getPageData };
