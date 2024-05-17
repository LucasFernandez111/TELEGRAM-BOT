const { Telegraf } = require("telegraf");
const botGroup = new Telegraf(process.env.TOKEN_BOT_GROUP);

const ID_GROUP = process.env.ID_GROUP;

const sendPost = async ({ title, url, price, imgPath }, maxRetries = 3) => {
  let retries = 0;
  let response;

  while (retries < maxRetries) {
    try {
      response = await botGroup.telegram.sendPhoto(
        "@glgekGLf",
        {
          source: imgPath,
        },
        {
          caption: `**🔥${title}🔥**
          \nHoy nuestra tienda de importaciones 🕵️ te trae ${title}. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
          \n**MUY IMPORTANTE; NOS DEBES DE ENVIAR EL COMPROBANTE PARA REGISTRAR LA COMPRA PARA EVITAR PROBLEMAS DE ENVIO.**
          \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
          \n✅${100}✅
          \n**🔥Acuérdate de enviarnos el comprobante🔥**
          \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫`,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "Ver Producto", url: `${url}` }]],
          },
        }
      );

      return response;
    } catch (error) {
      retries++;
      console.log(`Intento ${retries} fallido: ${error.message}`);
    }
  }

  throw new Error("Se ha alcanzado el número máximo de intentos sin éxito");
};

module.exports = {
  sendPost,
};
