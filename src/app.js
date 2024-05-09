const { Telegraf, Scenes, session } = require("telegraf");
const { dbConnect } = require("./config/mongo");
const { insertProduct } = require("./services/product");
const { sendPost } = require("./bot/bot-group/bot");
const {
  startResponse,
  productDataWizard,
} = require("./bot/bot-admin/functions/functions");

const botAdmin = new Telegraf(process.env.KEY_BOT_ADMIN);
const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);

botAdmin.command("enviar", () => {
  const date = {
    title: "reloj",
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

  sendPost(date);
});

botAdmin.start(startResponse);

const stage = new Scenes.Stage([productDataWizard]);
botAdmin.use(session());

botAdmin.use(stage.middleware());

botAdmin.action("manual", (ctx) => {
  ctx.scene.enter("PRODUCT_DATA_WIZARD");
});

botAdmin.launch();
botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});

module.exports = {
  botAdmin,
};
