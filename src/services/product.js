const { Promise } = require("xlsx-populate");
const { ProductModel } = require("../models/product");
const { handleError } = require("../utils/error_handle");
const { downloadImage } = require("./file");
const { readExcelFile, parseExcelFile } = require("./get_data_excel");
const { getPageData } = require("./scraping");
const { sendPost } = require("../bot/bot-group/bot");

const insertProduct = async (product) => {
  const responseInsert = await ProductModel.create(product);

  return responseInsert;
};

const getProducts = async () => {
  const responseGet = await ProductModel.find({});

  return responseGet;
};

const getProduct = async () => {
  const responseGet = await ProductModel.findOne().sort({ _id: -1 }).limit(1);

  return responseGet;
};

const publicProduct = async (ctx, path) => {
  try {
    ctx.reply("Publicando...");
    const workBook = await readExcelFile(path);

    const allDataExcel = await parseExcelFile(workBook);

    const urlPageAll = allDataExcel.map(({ url }) => url);

    const productInfoAll = await getPageData(urlPageAll);

    const productList = await Promise.all(
      productInfoAll.map(async (product) => {
        const imgPath = await downloadImage(product.imageUrl);

        return {
          ...product,
          imgPath,
          textAdmin:
            " Quería informarles sobre el nuevo producto que acabamos de lanzar en nuestra tienda en línea.",
          price: 50.99,
          description:
            "pulsera de lujo para hombre, cronógrafo luminoso, resistente al agua, de cuarzo, de acero inoxidable ",
          key: "RELOJCUARZO",
        };
      })
    );

    await Promise.all(
      productList.map(async (product) => await sendPost(product))
    );

    ctx.reply("Todos los elementos publicados");
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  insertProduct,
  getProducts,
  getProduct,
  publicProduct,
};
