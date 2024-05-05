const { ProductModel } = require("../models/product");

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

module.exports = {
  insertProduct,
  getProducts,
  getProduct,
};
