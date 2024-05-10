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
    const workBook = await readExcelFile(path);

    const allDataExcel = await parseExcelFile(workBook);

    const urlPageAll = allDataExcel.map(({ url }) => {
      return { url };
    });

    const productInfoAll = await Promise.all(
      urlPageAll.map(async ({ url }) => {
        const productInfo = await getPageData(url);

        return {
          ...productInfo,
          url,
        };
      })
    );

    const productList = await Promise.all(
      productInfoAll.map(async (product) => {
        const imgPath = await downloadImage(product.imageUrl);

        return {
          ...product,
          imgPath,
        };
      })
    );

    await sendPost(productList[0]);

    return productList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertProduct,
  getProducts,
  getProduct,
  publicProduct,
};
