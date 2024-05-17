const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    price: {
      type: Number,
    },

    code: {
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
