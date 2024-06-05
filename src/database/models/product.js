const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model("products", ProductSchema);

module.exports = {
  ProductModel,
};
