const { handleError } = require("../../../utils/error_handle");
const { getPageData } = require("../../../utils/scraping");
const { uploadFile, getFileLink } = require("../../../utils/upload_file");
const {
  deleteAllFile,
} = require("../../bot-client/services/botClient_services");
const path = require("path");
const { getDataXlsx } = require("../services/botAdmin_services");
const { publishMessage } = require("../utils/responses_en");
const { Markup } = require("telegraf");
const { code } = require("telegraf/format");
const { sendPost } = require("../../bot-group/services/botGroup_services");
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
    const fileLink = await getFileLink(ctx);
    await uploadFile("/document", fileLink, "document.xlsx");

    await ctx.replyWithMarkdown(
      "Deseas publicarlo?",
      Markup.inlineKeyboard([
        Markup.button.callback("✅", "button_publish"),
        Markup.button.callback("🚫", "button_no_publish"),
      ])
    );
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonPublish = async (ctx) => {
  try {
    const firstMessage = await ctx.replyWithMarkdown(
      "🤖📚 Leyendo el archivo Excel..."
    );

    const { productAll, yupooUrl } = await getDataXlsx(ctx);

    const url_list = productAll.map(({ url }) => url);
    const code_list = productAll.map(({ code }) => code);
    const page_info = await getPageData(url_list);
    const product_full = productAll.slice(0, 18);
    const page_info_full = page_info.slice(0, 18);
    const img_url_list = await getPageData([yupooUrl], code_list);

    const pathFileUploaded = await Promise.all(
      img_url_list.map(async ({ imgURL }) => {
        const parts = new URL(imgURL).pathname.split("/").reverse();
        const imgName = parts[1] + parts[0];

        const pathImage = await uploadFile("/images", imgURL, imgName);
        return pathImage;
      })
    );

    await ctx.telegram.editMessageText(
      firstMessage.chat.id,
      firstMessage.message_id,
      null,
      " Procesado exitosamente 🚀"
    );

    const publish_all = product_full.map(({ url }, i) => {
      return {
        url,
        imgPath: pathFileUploaded[i],
        price: page_info_full[i].price,
        title: page_info_full[i].title,
      };
    });

    await Promise.all(
      publish_all.forEach(async (product) => await sendPost(product))
    );

    await ctx.telegram.editMessageText(
      firstMessage.chat.id,
      firstMessage.message_id,
      null,
      " PUBLICADO!🚀"
    );
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonDelete = (ctx) => {
  try {
    const relativePath = path.join(__dirname, "../../../uploads/images");
    deleteAllFile(relativePath);
  } catch (error) {
    handleError(ctx, error);
  }
};
module.exports = {
  handleButtonAutomatic,
  handleButtonAutomaticOn,
  handleButtonPublish,
  handleButtonDelete,
};
