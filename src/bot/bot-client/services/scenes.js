const { Scenes } = require("telegraf");

const { senderMessage } = require("./messageSender");
const { handleError } = require("../../../utils/error_handle");

const questionMessage = new Scenes.WizardScene(
  "send_question_message",
  (ctx) => {
    ctx.reply(
      `📩 Por favor, a continuación envía tu pregunta \ny un asistente te ayudará pronto.\n\n¡Gracias por tu paciencia!`
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
      await senderMessage({
        chatId: ctx.chat.id,
        message: ctx.message,
        telegram: ctx.telegram,
      });
      ctx.reply(
        "¡Gracias! 😊 Tu pregunta ha sido recibida. El asistente responderá pronto."
      );
    } catch (error) {
      handleError(ctx, error);
    } finally {
      ctx.scene.leave();
    }
  }
);

const getReceipt = new Scenes.WizardScene(
  "scene_get_receipt",
  (ctx) => {
    ctx.reply(`🧾Por favor envia el comprobante a continuacion`);
    ctx.wizard.state.timeout = setTimeout(() => {
      ctx.reply(
        "Tiempo de espera para comprobante agotado. Por favor, intenta nuevamente."
      );
      ctx.scene.leave();
    }, 30000);
    ctx.wizard.next();
  },

  async (ctx) => {
    try {
      clearTimeout(ctx.wizard.state.timeout);
      const fileId = ctx.update.message.document.file_id;

      await ctx.sendDocument(process.env.ID_CHAT_ALEX, {
        document: fileId,
      });

      const confirmMessage = await ctx.reply(
        "✅Comprobante enviado correctamente!"
      );

      setTimeout(() => {
        ctx.telegram.deleteMessage(
          confirmMessage.chat.id,
          confirmMessage.message_id
        );
      }, 4500);
    } catch (err) {
      handleError(ctx, err);
      ctx.scene.reenter();
    } finally {
      ctx.scene.leave();
    }
  }
);

module.exports = new Scenes.Stage([questionMessage, getReceipt]);
