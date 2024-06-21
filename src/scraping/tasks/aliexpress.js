const { timeout } = require("puppeteer");
const requestInterception = require("../interceptions/interceptions");

const cookies = [
  {
    name: "aep_usuc_f",
    value: "site=glo&c_tp=EUR&region=ES&b_locale=es_ES",
    domain: ".aliexpress.com",
    path: "/",
  },
];
const taskAliexpress = async (page, url, code) => {
  await page.setRequestInterception(true);
  await page.on("request", requestInterception);

  await page.setCookie(...cookies);

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const titleFull = await page.title();

  if (["Page Not Found - Aliexpress.com", "404 page"].includes(titleFull))
    throw Error(`Enlace caido: ${url} `);

  const title = titleFull.split(",", 1)[0];

  const divElement = await page.$(".es--wrap--vZDQqfj", { timeout: 10000 });

  const price = await page.evaluate(
    (element) => element?.textContent,
    divElement
  );
  if (!price) throw Error(`${url}: Precio no encontrado!`);

  page.removeAllListeners("request");
  return { code, title, price, url };
};

module.exports = taskAliexpress;
