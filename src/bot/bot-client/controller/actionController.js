const { handleError } = require("../../../utils/error_handle");
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
    await ctx.scene.enter("sceneGetReceipt");
    await ctx.answerCbQuery();
  } catch (error) {
    handleError(ctx, error);
  }
};

module.exports = {
  handleButtonQuestions,
  handleButtonInfo,
  handleCustomQuestion,
  handleButtonReceipt,
};
