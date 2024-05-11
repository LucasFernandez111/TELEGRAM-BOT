const { Telegraf, Scenes, session } = require("telegraf");
const { dbConnect } = require("./config/mongo");
const { insertProduct } = require("./services/product");
const { sendPost } = require("./bot/bot-group/bot");
const {
  startResponse,
  productDataWizard,
} = require("./bot/bot-admin/functions/functions");
const { automatic, publicProduct } = require("./controller/actions");

const botAdmin = new Telegraf(process.env.TOKEN_BOT_ADMIN);
const botGroup = new Telegraf(process.env.TOKEN_BOT_GROUP);

botAdmin.command("enviar", () => {
  const date = {
    title: "reloj",
    imageUrl:
      "https://ae01.alicdn.com/kf/S505840536c5844a497e0d72d76c1e7c18/U-as-postizas-ovaladas-esculpidas-u-as-post",
    textAdmin:
      " Quería informarles sobre el nuevo producto que acabamos de lanzar en nuestra tienda en línea.",
    imgPath:
      "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\images\\Motocicleta-de-gasolina-china-nuevo-dise-o-150cc-Chopper-Cruiser-Vintage.jpg_.jpg",
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
botAdmin.action("automatic", (ctx) => automatic(ctx, botAdmin));

botAdmin.launch();
botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});
