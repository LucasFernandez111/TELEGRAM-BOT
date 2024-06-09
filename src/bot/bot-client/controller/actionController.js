const { message } = require("telegraf/filters");
const { handleError } = require("../../../utils/error_handle");
const {
  unlockUser,
  blockUser,
} = require("../../bot-admin/services/moderation");
const { questionsMessage, infoMessage } = require("../utils/responses_es"); // messages
const { questionsKeyBoard, infoKeyBoard } = require("../Views/keyboard"); //KeysBoard
const { messageMap } = require("../services/messageSender");

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
    const messageId = ctx.callbackQuery.message.message_id;
    const messageSenderInfo = messageMap.get(messageId);
    const userId = messageSenderInfo.senderId;

    await blockUser({ userId });

    ctx.reply(`Usuario bloqueado: ${messageSenderInfo.sender}\nID:${userId}`);
  } catch (err) {
    handleError(ctx, err);
  }
};

const handleUnlockUser = async (ctx) => {
  await ctx.answerCbQuery();
  try {
    const messageId = ctx.callbackQuery.message.message_id;
    const messageSenderInfo = messageMap.get(messageId);
    const userId = messageSenderInfo.senderId;
    await unlockUser({ userId });

    ctx.reply(
      `Usuario desbloqueado: ${messageSenderInfo.sender}\nID:${userId}`
    );
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
