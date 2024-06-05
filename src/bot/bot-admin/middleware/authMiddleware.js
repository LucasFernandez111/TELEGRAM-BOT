const isAdmin = (ctx, next) => {
  const userId = ctx.from.id;
  if (userId != 6659613114)
    return ctx.reply(
      "¡Ups! 🚫 Parece que no estás autorizado para usar este bot."
    );

  next();
};

module.exports = {
  isAdmin,
};
