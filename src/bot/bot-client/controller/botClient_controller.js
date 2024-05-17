const { handleError } = require("../../../utils/error_handle");
const messageEs = require("../utils/responses_es");
const { startKeyBoard, questionsKeyBoard } = require("../Views/keyboard");

const handleStart = (ctx) => {
  const { welcomeMessage } = messageEs;
  try {
    ctx.replyWithMarkdown(welcomeMessage.startMessage, startKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonQuestions = (ctx) => {
  try {
    ctx.replyWithMarkdown();
  } catch (error) {
    handleError(ctx, error);
  }
};
const handleButtonInformation = (ctx) => {
  try {
    ctx.replyWithMarkdown(`*Preguntas Frencuentes*`, questionsKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};
module.exports = {
  handleStart,
  handleButtonInformation,
  handleButtonQuestions,
};
