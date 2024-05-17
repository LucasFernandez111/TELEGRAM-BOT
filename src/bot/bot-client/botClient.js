const { Telegraf } = require("telegraf");
const botClientController = require("./controller/botClient_controller");

const botClient = new Telegraf(process.env.TOKEN_BOT_CLIENT);

botClient.start(botClientController.handleStart);

botClient.action(
  "questionsFrecuency",
  botClientController.handleButtonQuestions
);
botClient.action("information", botClientController.handleButtonInformation);

module.exports = botClient;
