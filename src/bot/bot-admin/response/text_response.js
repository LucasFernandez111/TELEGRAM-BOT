const startResponseText = {
  startMessage: "Bienvenido Alex \n Ingrese la forma de publicar producto ",

  startKeyboard: {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Automatico", callback_data: "automatic" },
          { text: "Manual", callback_data: "manual" },
        ],
      ],
    },
  },
};

module.exports = {
  startResponseText,
};
