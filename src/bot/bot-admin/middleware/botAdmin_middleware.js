const uploadMiddleware = (ctx) => {
  if (!ctx.update.message || !ctx.update.message.document)
    throw Error("No se ha recibido ningun mensaje. Vuelve a intentarlo...");
  const { mime_type } = ctx.update.message.document;

  const typeXlsx =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (mime_type != typeXlsx) {
    throw Error("El archivo no es un Excel xlsx");
  }
};

module.exports = {
  uploadMiddleware,
};
