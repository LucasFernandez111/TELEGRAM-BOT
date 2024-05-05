// const { Telegraf } = require("telegraf");
const { dbConnect } = require("./config/mongo");
const {
  getProducts,
  insertProduct,
  getProduct,
} = require("./services/product");

// const botAdmin = new Telegraf(process.env.KEY_BOT_ADMIN);
// //const botClient = new Telegraf(process.env.KEY_BOT_CLIENT);
// //const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);

insertProduct({
  title: "Cocina",
  textAdmin: "Cocina en descuento",
  imgPath: "c:imagenes",
  url: "http://mercadolibre.com/cocina",
  description: "Cocina para todo tipo de hogares simple y economica",
  key: "COCINA03",
});
// getProducts().then((products) => console.log(products));
getProduct().then((products) => console.log(products));
// botAdmin.launch();
//botClient.launch();
//botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});
