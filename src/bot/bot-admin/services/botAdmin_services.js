const fs = require("fs/promises");
const path = require("path");
const { welcomeMessage } = require("../utils/responses_en");
const { Markup } = require("telegraf");

const startHandler = (ctx) => {
  const { startMessage, keyBoard } = welcomeMessage;
  const { text_manual, text_automatic, callback_automatic, callback_manual } =
    keyBoard;
  ctx.replyWithMarkdown(
    startMessage,
    Markup.inlineKeyboard([
      [Markup.button.callback(text_automatic, callback_automatic)],
      [Markup.button.callback(text_manual, callback_manual)],
      [Markup.button.callback("Publicar productos 📌", "button_publish")],
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

  console.log(files);

  const filePath = path.join(
    __dirname,
    `../../../uploads/document/loadDocuments/${fileName}`
  );

  if (!fileName) throw new Error("Ningun archivo guardado");

  if (files.length > 1) throw new Error("Mas de 1 archivo guardado ");

  return filePath;
};

module.exports = {
  startHandler,

  getFileXlsx,
};
