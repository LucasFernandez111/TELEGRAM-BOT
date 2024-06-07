const fs = require("fs/promises");
const path = require("path");
const { welcomeMessage } = require("../utils/responses_en");
const { Markup } = require("telegraf");

const startHandler = (ctx) => {
  const { startMessage, keyBoard } = welcomeMessage;
  const { text_automatic, callback_automatic } = keyBoard;
  ctx.replyWithMarkdown(
    startMessage,
    Markup.inlineKeyboard([
      [Markup.button.callback(text_automatic, callback_automatic)],
      [Markup.button.callback("📌 Publicar productos", "button_publish")],
    ])
  );
};

const getFileXlsx = async (ctx) => {
  const dirPathDocument = path.join(
    __dirname,
    "../../../uploads/document/loadDocuments/"
  );

  const files = await fs.readdir(dirPathDocument);
  const fileName = files[0];

  const filePath = path.join(
    __dirname,
    `../../../uploads/document/loadDocuments/${fileName}`
  );

  if (!fileName) throw new Error("Ningun archivo guardado");

  if (files.length > 1) throw new Error("Mas de 1 archivo guardado ");

  return filePath;
};

const formatToSend = ({ productsAli, productsYupoo, listpath }) =>
  productsAli.map((product, index) => ({
    ...product,
    urlYupoo: productsYupoo[index].href,
    pathImage: listpath[index],
  }));

module.exports = {
  startHandler,
  getFileXlsx,
  formatToSend,
};
