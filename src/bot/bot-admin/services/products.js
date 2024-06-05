const { ProductModel } = require("../../../database/models/product");

const insertProduct = async ({ product }) => {
  return await ProductModel.create(product);
};

module.exports = {
  insertProduct,
};
