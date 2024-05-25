const fs = require("fs/promises");
const path = require("path");
const { getFileLink, uploadFile } = require("../../../utils/upload_file");
const { readExcelFile, parseExcelFile } = require("./botAdmin_excel_services");
const { welcomeMessage } = require("../utils/responses_en");
const { Markup } = require("telegraf");

const startHandler = (ctx) => {
  const { startMessage, keyBoard } = welcomeMessage;
  const { text_manual, text_automatic, callback_automatic, callback_manual } =
    keyBoard;
  ctx.replyWithMarkdownV2(
    startMessage,
    Markup.inlineKeyboard([
      Markup.button.callback(text_automatic, callback_automatic),
      Markup.button.callback(text_manual, callback_manual),
    ])
  );
};

const getDataXlsx = async (ctx) => {
  const dirPathDocument = path.join(__dirname, "../../../uploads/document");

  const files = await fs.readdir(dirPathDocument);
  const fileName = files[0];

  const filePath = path.join(
    __dirname,
    `../../../uploads/document/${fileName}`
  );

  if (!fileName) throw new Error("Ningun archivo guardado");

  if (files.length > 1) throw new Error("Mas de 1 archivo guardado ");

  const workBook = await readExcelFile(filePath);

  const productInfoAll = await parseExcelFile(workBook);

  return productInfoAll;
};
module.exports = {
  startHandler,

  getDataXlsx,
};
