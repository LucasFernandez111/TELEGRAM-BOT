exports.sceneMessageMiddleware = (ctx, next) => {
  if (ctx.updateType === "message" && ctx.message.text) {
    return next();
  } else {
    ctx.reply("Por favor, envía un mensaje de texto para continuar.");
    return;
  }
};

exports.blockOtherHandlers = (ctx, next) => {
  if (ctx.scene && ctx.scene.current) {
    return ctx.reply(
      "Por favor, complete la interacción actual antes de continuar."
    );
  }
  return next();
};
