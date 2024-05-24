const { handleError } = require("../../../utils/error_handle");
const { getPageData } = require("../../../utils/scraping");
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
    ctx.replyWithMarkdown("Leyendo excel");
    const { productAll, yupooUrl } = await getDataXlsx(ctx);

    const url_list = productAll.map((data) => data.url);

    const pages_info = await getPageData(yupooUrl);

    console.log(pages_info);
  } catch (error) {
    handleError(ctx, error);
  }
};

module.exports = {
  handleButtonAutomatic,
  handleButtonAutomaticOn,
  handleButtonPublish,
};
