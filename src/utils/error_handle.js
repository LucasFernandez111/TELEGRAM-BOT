const handleError = (ctx, error) => {
  console.info(error);

  if (error.message.includes("undefined is not iterable")) return;
  ctx.reply(error.message);
};

module.exports = { handleError };
