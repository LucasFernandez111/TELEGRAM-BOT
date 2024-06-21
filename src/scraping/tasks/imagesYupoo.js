const { timeout } = require("puppeteer");
const { imagesBasePath } = require("../../config/config");
const path = require("path");

exports.getImages = async ({ page, url }) => {
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2, // Aumenta la densidad de píxeles
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  await page.waitForSelector("img.autocover", { timeout: 10000 });

  const elementImage = await page.$("img.autocover");

  if (!elementImage) {
    console.error(`[getImages] No se encontró el elemento en ${url}`);
    throw new Error(`No se encontró el elemento en ${url}`);
  }

  const name = url.split("/").pop().split("?")[0] + ".png";
  const pathRelative = path.resolve(imagesBasePath, name);

  const boundingBox = await elementImage.boundingBox();

  if (!boundingBox) {
    console.error(
      `[getImages] No se pudo obtener el bounding box del elemento en ${url}`
    );
    throw new Error(
      `No se pudo obtener el bounding box del elemento en ${url}`
    );
  }

  await page.screenshot({
    path: pathRelative,
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
    },
  });

  return pathRelative;
};
