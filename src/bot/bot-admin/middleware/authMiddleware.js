const { ID_CHAT_ALEX } = require("../../../config/config");

const isAdmin = (ctx, next) => {
  const userId = ctx.from.id;
  if (userId != ID_CHAT_ALEX)
    return ctx.reply(
      "¡Ups! 🚫 Parece que no estás autorizado para usar este bot."
    );

  next();
};

module.exports = {
  isAdmin,
};
