const cookies = [
  {
    name: "aep_usuc_f",
    value: "site=glo&c_tp=EUR&region=ES&b_locale=es_ES",
    domain: ".aliexpress.com",
    path: "/",
  },
];

exports.taskAliexpress = async (page, url, code) => {
  await page.setCookie(...cookies);
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const title = await page.title();

  if (["Page Not Found - Aliexpress.com", "404 page"].includes(title))
    throw Error(`Enlace caido: ${url} `);

  const element = await page.waitForSelector(".es--wrap--vZDQqfj ", {
    timeout: 30000,
  });

  const price = await element.evaluate((div) => div.textContent);
  return { code, price, url };
};
