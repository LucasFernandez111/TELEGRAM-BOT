exports.sceneMessageMiddleware = (ctx, next) => {
  if (ctx.updateType === "message" && ctx.message.text) {
    return next();
  } else {
    ctx.reply("Por favor, envía un mensaje de texto para continuar.");
    return;
  }
};
