const { handleError } = require("../../../utils/error_handle");
const { getFileLink, uploadFile } = require("../../../utils/upload_file");
const {
  getDocumentButton,
  getDataXlsx,
} = require("../services/botAdmin_services");
const { publishMessage } = require("../utils/responses_en");
const { query, keyBoard } = publishMessage;
const { Markup } = require("telegraf");

const handleButtonAutomatic = async (ctx) => {
  try {
    ctx.replyWithMarkdownV2("ENVIA EL ARCHIVO EXCEL");
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonAutomaticOn = async (ctx) => {
  try {
    ctx.replyWithMarkdownV2("Excel cargado correctamente");
    await getDocumentButton(ctx);

    ctx.answerCbQuery();

    await ctx.replyWithMarkdownV2(
      query,
      Markup.inlineKeyboard([
        Markup.button.callback(
          keyBoard.text_publish,
          keyBoard.callback_publish
        ),
        Markup.button.callback(
          keyBoard.text_no_publish,
          keyBoard.callback_no_publish
        ),
      ])
    );
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonPublish = async (ctx) => {
  try {
    ctx.replyWithMarkdownV2("Leyendo excel");

    const productInfoList = await getDataXlsx(ctx);
  } catch (error) {
    handleError(ctx, error);
  }
};

module.exports = {
  handleButtonAutomatic,
  handleButtonAutomaticOn,
  handleButtonPublish,
};
