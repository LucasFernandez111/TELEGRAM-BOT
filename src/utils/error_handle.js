const handleError = (ctx, error) => {
  console.info(error);

  ctx.reply(error.message);
};

module.exports = { handleError };
