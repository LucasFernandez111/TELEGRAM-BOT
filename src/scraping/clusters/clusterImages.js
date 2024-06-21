const { Cluster } = require("puppeteer-cluster");
const { getImages } = require("../tasks/imagesYupoo");

const clusterImages = async ({ urls }) => {
  const listPath = [];
  const cluster = await Cluster.launch({
    puppeteerOptions: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data: url }) => {
    try {
      const imgPaths = await getImages({ page, url });
      return listPath.push(imgPaths);
    } catch (error) {
      throw Error("Hubo un error al capturar las imagenes...");
    }
  });

  urls.forEach(({ href }) => cluster.queue(href));

  await cluster.idle();
  await cluster.close();

  return listPath;
};

module.exports = clusterImages;
