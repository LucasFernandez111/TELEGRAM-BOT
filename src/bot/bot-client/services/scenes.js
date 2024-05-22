const { Scenes } = require("telegraf");
const { sendMessageUser, uploadFile } = require("./botClient_services");
const fs = require("fs/promises");

const sceneMessage = new Scenes.WizardScene(
  "sceneMessage",
  (ctx) => {
    ctx.reply(
      `Por favor, a continuación envía tu pregunta 📩\ny un asistente te ayudará pronto.\n\n¡Gracias por tu paciencia!`
    );

    ctx.wizard.state.timeout = setTimeout(() => {
      ctx.reply(
        "Tiempo de espera para mensaje agotado. Por favor, intenta nuevamente."
      );
      ctx.scene.leave();
    }, 60000);

    return ctx.wizard.next();
  },
  async (ctx) => {
    clearTimeout(ctx.wizard.state.timeout);
    await sendMessageUser(ctx);
    ctx.reply(
      `¡Gracias! Tu pregunta ha sido recibida. El asistente responderá pronto.`
    );
    return ctx.scene.leave();
  }
);

const sceneGetReceipt = new Scenes.WizardScene(
  "sceneGetReceipt",
  (ctx) => {
    ctx.reply(`🧾Por favor envia el comprobante a continuacion`);
    ctx.wizard.state.timeout = setTimeout(() => {
      ctx.reply(
        "Tiempo de espera para comprobante agotado. Por favor, intenta nuevamente."
      );
      ctx.scene.leave();
    }, 60000);
    ctx.wizard.next();
  },

  async (ctx) => {
    clearTimeout(ctx.wizard.state.timeout);
    const chat_id = ctx.from.id;

    const { fileName, filePath, fileLink } = await uploadFile(ctx);

    const data = await fs.readFile(filePath);

    ctx.telegram.sendDocument(chat_id, {
      source: data,
      filename: fileName,
    });

    ctx.scene.leave();
  }
);

module.exports = {
  sceneMessage,
  sceneGetReceipt,
};
