const { Markup } = require("telegraf");
const messageEs = require("../utils/responses_es");
const { welcomeMessage, questionsMessage } = messageEs;
const { keyBoard: welKeyboard } = welcomeMessage;
const { keyBoard: quesKeyboard } = questionsMessage;

exports.startKeyBoard = Markup.inlineKeyboard([
  [Markup.button.callback(welKeyboard.text_questions, "questionsFrecuency")],
  [Markup.button.callback(welKeyboard.text_info, "information")],
]);

exports.questionsKeyBoard = Markup.inlineKeyboard(
  quesKeyboard.text_options.map((text, index) => [
    Markup.button.callback(text, `option${index}`),
  ])
);

exports.informationKeyBoard = Markup.inlineKeyboard([
  [Markup.button.callback()],
  [Markup.button.callback()],
]);
