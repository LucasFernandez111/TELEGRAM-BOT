const { Telegraf } = require("telegraf");
const { dbConnect } = require("./config/mongo");

const {
  getProducts,
  insertProduct,
  getProduct,
} = require("./services/product");
const { sendPost } = require("./bot/bot-group/bot");

const botAdmin = new Telegraf(process.env.KEY_BOT_ADMIN);
const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);

const date = {
  title: "POEDAGAR-reloj⌚",
  textAdmin:
    " Quería informarles sobre el nuevo producto que acabamos de lanzar en nuestra tienda en línea.",
  imgPath:
    "C:\\Users\\fluca\\OneDrive\\Escritorio\\TELEGRAM-BOT\\src\\bot\\bot-group\\images\\reloj.jpeg",
  url: "https://es.aliexpress.com/item/",
  price: 50.99,
  description:
    "pulsera de lujo para hombre, cronógrafo luminoso, resistente al agua, de cuarzo, de acero inoxidable ",
  key: "RELOJCUARZO",
};

botAdmin.command("enviar", () => {
  insertProduct(date).then((res) => sendPost(res));
});

botAdmin.launch();
botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});
