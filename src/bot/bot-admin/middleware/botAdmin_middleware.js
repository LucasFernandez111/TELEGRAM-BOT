const { handleError } = require("../../../utils/error_handle");

const uploadMiddleware = async (ctx, next) => {
  const { mime_type } = ctx.update.message.document;

  const typeXlsx =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (mime_type != typeXlsx) {
    return handleError(ctx, new Error("El archivo no es un Excel xlsx"));
  }

  next();
};

module.exports = {
  uploadMiddleware,
};
