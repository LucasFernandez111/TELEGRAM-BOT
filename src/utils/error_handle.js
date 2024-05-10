const handleError = (ctx, error) => {
  ctx.replyWithMarkdownV2(error);
};

module.exports = { handleError };
