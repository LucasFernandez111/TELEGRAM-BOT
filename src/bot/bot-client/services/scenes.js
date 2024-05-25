const { Scenes } = require("telegraf");
const {
  sendMessageUser,
  uploadFile,
  sendReceipt,
} = require("./botClient_services");
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

    try {
      await sendMessageUser(ctx);
      ctx.reply(
        `¡Gracias! Tu pregunta ha sido recibida. El asistente responderá pronto.`
      );
    } catch (error) {
      // Maneja el error de manera específica, por ejemplo:

      ctx.reply(error);
    } finally {
      ctx.scene.leave();
    }
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
    try {
      clearTimeout(ctx.wizard.state.timeout);
      const chat_id = ctx.from.id;

      const { fileName, filePath } = await uploadFile(ctx);

      const data = await fs.readFile(filePath);

      await sendReceipt(ctx, chat_id, data, fileName);
    } catch {
      ctx.reply("Documento no recibido!, intentelo nuevamente");
    } finally {
      ctx.scene.leave();
    }
  }
);

module.exports = {
  sceneMessage,
  sceneGetReceipt,
};
