const { Telegraf } = require("telegraf");
const botClientController = require("./controller/botClient_controller");

const botClient = new Telegraf(process.env.TOKEN_BOT_CLIENT);

botClient.start(botClientController.handleStart);

botClient.command("menu", botClientController.handleMenu);

botClient.action("questions", botClientController.handleButtonQuestions);
botClient.action("information", botClientController.handleButtonInfo);

botClient.on("callback_query", botClientController.handleButtonCallBack);

module.exports = botClient;
