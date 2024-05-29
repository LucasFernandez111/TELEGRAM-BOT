const { handleError } = require("../../../utils/error_handle");
const {
  deleteAllFile,
} = require("../../bot-client/services/botClient_services");
const path = require("path");

const handleButtonAutomatic = async (ctx) => {
  ctx.scene.enter("get_document_scene");
};

const handleButtonPublish = async (ctx) => {
  try {
    const firstMessage = await ctx.replyWithMarkdown(
      "🤖📚 Leyendo el archivo Excel..."
    );

    console.log(newWorkBook);

    // const url_list = productAll.map(({ url }) => url);
    // const code_list = productAll.map(({ code }) => code);

    // const pathFileUploaded = await Promise.all(
    //   img_url_list.map(async ({ imgURL }) => {
    //     const parts = new URL(imgURL).pathname.split("/").reverse();
    //     const imgName = parts[1] + parts[0];

    //     const pathImage = await uploadFile("/images", imgURL, imgName);
    //     return pathImage;
    //   })
    // );

    await ctx.telegram.editMessageText(
      firstMessage.chat.id,
      firstMessage.message_id,
      null,
      " PRODUCTOS PUBLICADOS!🚀🛒📢"
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
  handleButtonPublish,
  handleButtonDelete,
};
