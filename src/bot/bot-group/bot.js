const { Telegraf } = require("telegraf");
const { textGroup } = require("./response/text_response");
const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);

const ID_GROUP = process.env.ID_GROUP;

const sendPost = ({
  title,
  textAdmin,
  url,
  price,
  imgPath,
  description,
  key,
}) => {
  botGroup.telegram.sendPhoto(
    "@glgekGLf",
    {
      source: imgPath,
    },
    {
      caption: `**🔥${title}🔥**
      \nHoy nuestra tienda de importaciones 🕵️ te trae ${title}. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
      \n**MUY IMPORTANTE; NOS DEBES DE ENVIAR EL COMPROBANTE PARA REGISTRAR LA COMPRA PARA EVITAR PROBLEMAS DE ENVIO.**
      \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
      \n✅${price}✅
      \n**🔥Acuérdate de enviarnos el comprobante🔥**
      \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Ver Producto", url: `${url}` }]],
      },
    }
  );
};

module.exports = {
  sendPost,
};
