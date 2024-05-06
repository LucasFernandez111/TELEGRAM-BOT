const { Telegraf } = require("telegraf");
const { dbConnect } = require("./config/mongo");
const {
  getProducts,
  insertProduct,
  getProduct,
} = require("./services/product");

const botAdmin = new Telegraf(process.env.KEY_BOT_ADMIN);
const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);
const image = require("./bot/bot-group/images/mama-dolar.png");

botAdmin.on("message", () => {
  botGroup.telegram.sendPhoto(
    process.env.ID_GROUP,
    { source: image },
    { caption: "Aquí está tu foto!" }
  );
});
botAdmin.launch();

botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});
