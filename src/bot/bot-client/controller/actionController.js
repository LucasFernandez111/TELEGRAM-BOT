const { handleError } = require("../../../utils/error_handle");
const {
  unlockUser,
  blockUser,
} = require("../../bot-admin/services/moderation");
const { questionsMessage, infoMessage } = require("../utils/responses_es"); // messages
const { questionsKeyBoard, infoKeyBoard } = require("../Views/keyboard"); //KeysBoard

const handleButtonQuestions = (ctx) => {
  /** Button Preguntas Frecuentes */
  try {
    ctx.answerCbQuery();
    ctx.replyWithMarkdown(questionsMessage.message, questionsKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonInfo = (ctx) => {
  /** Button Informacion Valiosa */

  try {
    ctx.answerCbQuery();
    ctx.replyWithMarkdown(infoMessage.message, infoKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleCustomQuestion = async (ctx) => {
  /** Boton pregunta personalizada */

  await ctx.scene.enter("send_question_message");
  await ctx.answerCbQuery();
};

const handleButtonReceipt = async (ctx) => {
  try {
    await ctx.scene.enter("scene_get_receipt");
    await ctx.answerCbQuery();
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleBlockUser = async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await blockUser({ userId: ctx.from.id });

    ctx.reply(`Usuario bloqueado: ${ctx.from.username}\nID:${ctx.from.id}`);
  } catch (err) {
    handleError(ctx, err);
  }
};

const handleUnlockUser = async (ctx) => {
  await ctx.answerCbQuery();
  try {
    await unlockUser({ userId: ctx.from.id });

    ctx.reply(`Usuario desbloqueado: ${ctx.from.username}\nID:${ctx.from.id}`);
  } catch (err) {
    handleError(ctx, err);
  }
};
module.exports = {
  handleButtonQuestions,
  handleButtonInfo,
  handleCustomQuestion,
  handleButtonReceipt,
  handleBlockUser,
  handleUnlockUser,
};
