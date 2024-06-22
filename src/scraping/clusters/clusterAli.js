const { Cluster } = require("puppeteer-cluster");
const taskAliexpress = require("../tasks/aliexpress");

const clusterAli = async ({ urls, codes, ctx }) => {
  const data = [];

  const cluster = await Cluster.launch({
    puppeteerOptions: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--disable-features=site-per-process",
        "--no-zygote",
      ],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 1,
  });

  await cluster.task(async ({ page, data: { url, code } }) => {
    try {
      products = await taskAliexpress(page, url, code);
      data.push(products);
    } catch (err) {
      console.error(`Error Scaping Aliexpress : ${err.message}`);
      ctx.reply(err.message);
    }
  });

  urls.forEach((url, index) => {
    cluster.queue({ url, code: codes[index] });
  });

  await cluster.idle();
  await cluster.close();

  return data;
};

module.exports = clusterAli;
