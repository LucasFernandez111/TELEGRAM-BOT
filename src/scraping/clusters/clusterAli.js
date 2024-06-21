const { Cluster } = require("puppeteer-cluster");
const taskAliexpress = require("../tasks/aliexpress");

const clusterAli = async ({ urls, codes, ctx }) => {
  const data = [];

  const cluster = await Cluster.launch({
    puppeteerOptions: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data: { url, code } }) => {
    try {
      products = await taskAliexpress(page, url, code);
      return data.push(products);
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
