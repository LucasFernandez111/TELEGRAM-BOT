const { ProductModel } = require("../models/product");

const insertProduct = async (product) => {
  const responseInsert = await ProductModel.create(product);

  return responseInsert;
};

module.exports = {
  insertProduct,
};
