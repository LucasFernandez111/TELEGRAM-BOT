const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    textAdmin: {
      type: String,
    },
    imgPath: {
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
