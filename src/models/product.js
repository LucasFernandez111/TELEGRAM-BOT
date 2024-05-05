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

ProductSchema.pre("save", (next) => {
  console.log("Se actualizó la base de datos");

  next();
});

ProductSchema.post("save", function (doc, next) {
  console.log("Se guardó el documento:", doc);
  next();
});

const ProductModel = model("products", ProductSchema);

module.exports = {
  ProductModel,
};
