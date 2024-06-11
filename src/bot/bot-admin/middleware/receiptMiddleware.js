const receiptMiddleware = (ctx) => {
  if (!ctx.update.message.document)
    throw Error("Envia el archivo como un documento");

  return;
};

module.exports = {
  receiptMiddleware,
};
