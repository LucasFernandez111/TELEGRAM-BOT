const { Cluster } = require("puppeteer-cluster");
const taskYupoo = require("../tasks/yupoo");
const { handleError } = require("../../utils/error_handle");

const clusterYupoo = async ({ urls, codes, ctx }) => {
  let dataList = [];

  const cluster = await Cluster.launch({
    puppeteerOptions: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    },
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data: { url, code } }) => {
    try {
      dataList = await taskYupoo(page, url, codes);
      console.log(dataList);
    } catch (error) {
      handleError(ctx, error);
    }
  });

  urls.forEach((url, index) => {
    cluster.queue({ url, code: codes[index] });
  });

  await cluster.idle();
  await cluster.close();

  return dataList;
};

module.exports = clusterYupoo;
