const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");

const requestInterception = (request) => {
  if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else request.continue();
};

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

  await cluster.task(async ({ page, data: url, worker }) => {
    await page.setRequestInterception(true);

    await page.on("request", requestInterception);
    await page.goto(url);

    const titleFull = await page.title();

    if (
      titleFull === "Page Not Found - Aliexpress.com" ||
      titleFull === "404 page"
    )
      return null;

    const title = titleFull.split(",", 1)[0];

    const divElement = await page.$(".es--wrap--erdmPRe");

    const price = await page.evaluate(
      (element) => element.textContent,
      divElement
    );

    page.removeAllListeners("request");
    dataList.push({
      title,
      price,
    });
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

  console.log(dataList);
};

getPageData([
  "https://es.aliexpress.com/item/1005005220784707.html?spm=a2g0o.tm1000004745.d5.1.928b5ce5sSfxrV&pdp_ext_f=%7B%22ship_from%22%3A%22CN%22%2C%22sku_id%22%3A%2212000032239421388%22%7D&scm=1007.39065.379845.0&scm_id=1007.39065.379845.0&scm-url=1007.39065.379845.0&pvid=6f5dace8-6624-4706-97c4-aaed6f12746a&utparam=%257B%2522process_id%2522%253A%2522standard-item-process-2%2522%252C%2522x_object_type%2522%253A%2522product%2522%252C%2522pvid%2522%253A%25226f5dace8-6624-4706-97c4-aaed6f12746a%2522%252C%2522belongs%2522%253A%255B%257B%2522id%2522%253A%252233480447%2522%252C%2522type%2522%253A%2522dataset%2522%257D%255D%252C%2522pageSize%2522%253A%252218%2522%252C%2522language%2522%253A%2522es%2522%252C%2522scm%2522%253A%25221007.39065.379845.0%2522%252C%2522countryId%2522%253A%2522AR%2522%252C%2522scene%2522%253A%2522SD-Waterfall%2522%252C%2522tpp_buckets%2522%253A%252221669%25230%2523265320%25231_21669%25234190%252319167%2523993_29065%25230%2523379845%25233%2522%252C%2522x_object_id%2522%253A%25221005005220784707%2522%257D&pdp_npi=4%40dis%21ARS%21ARS%204.681%2C00%21ARS%202.200%2C51%21%21%2138.12%2117.92%21%402101fb0f17157398903415945e8c04%2112000032239421388%21gdf%21AR%212195267892%21&aecmd=true&gatewayAdapt=glo2esp",
  "https://es.aliexpress.com/item/1005005220784707.html?spm=a2g0o.tm1000004745.d5.1.928b5ce5sSfxrV&pdp_ext_f=%7B%22ship_from%22%3A%22CN%22%2C%22sku_id%22%3A%2212000032239421388%22%7D&scm=1007.39065.379845.0&scm_id=1007.39065.379845.0&scm-url=1007.39065.379845.0&pvid=6f5dace8-6624-4706-97c4-aaed6f12746a&utparam=%257B%2522process_id%2522%253A%2522standard-item-process-2%2522%252C%2522x_object_type%2522%253A%2522product%2522%252C%2522pvid%2522%253A%25226f5dace8-6624-4706-97c4-aaed6f12746a%2522%252C%2522belongs%2522%253A%255B%257B%2522id%2522%253A%252233480447%2522%252C%2522type%2522%253A%2522dataset%2522%257D%255D%252C%2522pageSize%2522%253A%252218%2522%252C%2522language%2522%253A%2522es%2522%252C%2522scm%2522%253A%25221007.39065.379845.0%2522%252C%2522countryId%2522%253A%2522AR%2522%252C%2522scene%2522%253A%2522SD-Waterfall%2522%252C%2522tpp_buckets%2522%253A%252221669%25230%2523265320%25231_21669%25234190%252319167%2523993_29065%25230%2523379845%25233%2522%252C%2522x_object_id%2522%253A%25221005005220784707%2522%257D&pdp_npi=4%40dis%21ARS%21ARS%204.681%2C00%21ARS%202.200%2C51%21%21%2138.12%2117.92%21%402101fb0f17157398903415945e8c04%2112000032239421388%21gdf%21AR%212195267892%21&aecmd=true&gatewayAdapt=glo2esp",
]);

module.exports = { getPageData };
