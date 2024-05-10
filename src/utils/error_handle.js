const handleError = (ctx, error) => {
  const errorMessage = error.message.replace(/^ERROR: /i, "");

  ctx.replyWithMarkdownV2(errorMessage);
};

module.exports = { handleError };
