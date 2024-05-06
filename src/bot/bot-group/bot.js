const { Telegraf } = require("telegraf");
const fs = require("fs");
const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);
const { getImageUrl } = require("../../services/file");

const ID_GROUP = process.env.ID_GROUP;

const sendPost = ({ title, textAdmin, price, imgPath, description, key }) => {
  const image = fs.readFileSync(imgPath);

  botGroup.telegram.sendPhoto(
    ID_GROUP,
    {
      source: image,
    },
    {
      caption:
        `¡Nuevo producto disponible!\n\n` +
        `*${title}*\n\n` +
        `${textAdmin}\n\n` +
        `${description}\n` +
        `Precio: *$${price.toFixed(2)}*\n\n` +
        `Palabra clave: *${key}*\n\n` +
        `[¡Compra ahora!]`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Ver Producto", url: "https://www.google.com" }],
        ],
      },
    }
  );
};

module.exports = {
  sendPost,
};
