const receiptMiddleware = (ctx) => {
  if (!ctx.update.message.document.file_id)
    throw Error("Envia el archivo como un documento");

  return;
};

module.exports = {
  receiptMiddleware,
};
