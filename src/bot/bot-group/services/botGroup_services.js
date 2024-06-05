const botGroup = require("../botGroup");

const sendPost = async ({ title, urlAli, urlYupoo, price, pathImage }) => {
  await botGroup.telegram.sendPhoto(
    "@glgekGLf",
    {
      source: pathImage,
    },
    {
      caption: `<b>🔥${title}🔥</b>
          \nHoy nuestra tienda de importaciones 🕵️ te trae ${title}. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
          \n<b>MUY IMPORTANTE; NOS DEBES DE ENVIAR EL COMPROBANTE PARA REGISTRAR LA COMPRA PARA EVITAR PROBLEMAS DE ENVIO.</b>
          \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
          \n✅${price}✅
          \n<b>🔥Acuérdate de enviarnos el comprobante🔥</b>
          \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫\n\nPara continuar, puedes dirigirte al bot @Joselu_asistente_bot 🤖`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Ver Producto", url: `${urlAli}` }],
          [{ text: "Mas imagenes", url: `${urlYupoo}` }],
        ],
      },
    }
  );
};

module.exports = {
  sendPost,
};
