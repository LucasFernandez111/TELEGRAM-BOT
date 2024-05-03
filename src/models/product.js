const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    imgpath: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    key: {
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
