const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    imgPath: {
      type: String,
    },
    url: {
      type: String,
    },
    price: {
      type: Number,
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
