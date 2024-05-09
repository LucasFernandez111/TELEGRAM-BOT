const { insertProduct } = require("../../../services/product");
const { sendPost } = require("../../bot-group/bot");
const { startResponseText } = require("../response/text_response");
const { Scenes } = require("telegraf");

const { startMessage, startKeyboard } = startResponseText;

const startResponse = (ctx) => {
  ctx.replyWithMarkdownV2(startMessage, startKeyboard);
};

const productDataWizard = new Scenes.WizardScene(
  "PRODUCT_DATA_WIZARD",
  (ctx) => {
    ctx.wizard.state.productData = {};
    ctx.reply("Ingresa el titulo del producto");
    return ctx.wizard.next();
  },
  (ctx) => {
    const title = ctx.message.text;
    ctx.wizard.state.productData.title = title;
    ctx.reply(`Ingrese la ubicacion de la imagen`);

    return ctx.wizard.next();
  },
  (ctx) => {
    try {
      const imgPath = ctx.message.text;
      ctx.wizard.state.productData.imgPath = imgPath;
      ctx.reply(`Ingrese el texto tuyo para dicho producto`);
      return ctx.wizard.next();
    } catch (error) {
      ctx.reply(`Hubo un error`);
    }
  },
  (ctx) => {
    const textAdmin = ctx.message.text;
    ctx.wizard.state.productData.textAdmin = textAdmin;
    ctx.reply(`Ingrese el precio`);
    return ctx.wizard.next();
  },
  (ctx) => {
    const price = ctx.message.text;
    ctx.wizard.state.productData.price = price;
    ctx.reply(`Ingrese la URL del producto`);
    return ctx.wizard.next();
  },
  (ctx) => {
    const url = ctx.message.text;
    ctx.wizard.state.productData.url = url;
    ctx.reply(`Ingrese la descripción del producto`);
    return ctx.wizard.next();
  },
  (ctx) => {
    const description = ctx.message.text;
    ctx.wizard.state.productData.description = description;
    ctx.reply(`Palabra clave para su compra `);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const key = ctx.message.text;
    ctx.wizard.state.productData.key = key;
    ctx.reply("Todos los campos fueron cargados correctamente!!");

    console.log("Datos del producto:", ctx.wizard.state.productData);

    insertProduct(ctx.wizard.state.productData).then((res) => sendPost(res));

    return ctx.scene.leave();
  }
);

module.exports = {
  startResponse,
  productDataWizard,
};
