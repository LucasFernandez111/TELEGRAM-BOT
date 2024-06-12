const { Markup } = require("telegraf");
const messageEs = require("../utils/responses_es");
const { menuMessage, questionsMessage, infoMessage } = messageEs;

exports.menuKeyBoard = Markup.inlineKeyboard([
  [Markup.button.callback(menuMessage.keyBoard.text_tutorial, "tutorial")],
  [Markup.button.callback(menuMessage.keyBoard.text_questions, "questions")],
  [Markup.button.callback(menuMessage.keyBoard.text_info, "information")],
  [Markup.button.callback(menuMessage.keyBoard.text_custom, "custom_question")],
]);

exports.questionsKeyBoard = Markup.inlineKeyboard(
  questionsMessage.keyBoard.text_options
    .filter((text, index) => index <= 4)
    .map((text, index) => {
      return [Markup.button.callback(text, `option${index}`)];
    })
);

exports.questionsOthersKeyBoard = questionsMessage.keyBoard.text_options
  .filter((text, index) => index >= 5)
  .map((text, index) => [Markup.button.callback(text, `other${index}`)]);

exports.infoKeyBoard = Markup.inlineKeyboard(
  infoMessage.keyboard.text_options.map((button, index) => [
    Markup.button.callback(button, `OPTION_${index}`),
  ])
);

exports.questionsKeyBoardReturn = questionsMessage.keyBoard.text_options
  .filter((text, index) => index <= 4)
  .map((text, index) => {
    return [Markup.button.callback(text, `option${index}`)];
  });
