const { ProductModel } = require("../models/product");
const { readExcelFile, parseExcelFile } = require("./get_data_excel");

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
  const workBook = await readExcelFile(path);

  const dataExcel = await parseExcelFile(workBook);
};

module.exports = {
  insertProduct,
  getProducts,
  getProduct,
  publicProduct,
};
