const { ID_GROUP } = require("../../../config/config");
const botGroup = require("../../bot-group/botGroup");
const sendPost = async ({ urlAli, urlYupoo, price, pathImage }) => {
  await botGroup.telegram.sendPhoto(
    ID_GROUP,
    {
      source: pathImage,
    },
    {
      caption: `<b>🔥NUEVA OFERTA EXCLUSIVA DEL CANAL DE VENTAS🔥</b>
            \nHoy nuestra tienda de importaciones 🕵️ te trae un nuevo producto 🏴‍☠️. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
            \n<b>MUY IMPORTANTE</b>
            \n• NOS DEBES DE ENVIAR EL COMPROBANTE PARA REGISTRAR LA COMPRA ASÍ EVITAR PROBLEMAS DE ENVÍO.
            \n• ADEMÁS, TEN EN CUENTA QUE LOS ENLACES PUEDEN CADUCAR POR ELLO APROVECHA LA OFERTA EN EL MOMENTO VEAS ESTE MENSAJE.
            \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
            \n✅${price}✅
            \n<b>🔥Acuérdate de enviarnos el comprobante🔥</b>
            \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫\n\nPara continuar, puedes dirigirte al bot @Joselu_asistente_bot 🤖`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Ver Producto", url: `${urlAli}` }],
          [{ text: "Mas imagenes ", url: `${urlYupoo}` }],
        ],
      },
    }
  );
};

module.exports = {
  sendPost,
};
