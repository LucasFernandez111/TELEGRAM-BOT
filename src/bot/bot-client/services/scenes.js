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

module.exports = new Scenes.Stage([questionMessage]);
