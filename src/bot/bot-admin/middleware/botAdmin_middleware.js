const { handleError } = require("../../../utils/error_handle");

const uploadMiddleware = (ctx) => {
  const { mime_type } = ctx.update.message.document;

  const typeXlsx =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (mime_type != typeXlsx) {
    ctx.reply("El archivo no es un Excel xlsx");
    ctx.scene.reenter();
  }
};

module.exports = {
  uploadMiddleware,
};
