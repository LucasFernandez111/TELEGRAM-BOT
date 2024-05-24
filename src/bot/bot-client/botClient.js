const { Telegraf, Scenes, session } = require("telegraf");
const botClientController = require("./controller/botClient_controller");
const { infoMessage } = require("./utils/responses_es");
const { sceneMessage, sceneGetReceipt } = require("./services/scenes");
const { sceneMessageMiddleware } = require("./middleware/scenes_midleware");
const botClient = new Telegraf(process.env.TOKEN_BOT_CLIENT);
const stage = new Scenes.Stage([sceneMessage, sceneGetReceipt]);

sceneMessage.use(sceneMessageMiddleware);

botClient.use(session());

botClient.use(stage.middleware());

botClient.start(botClientController.handleStart);

botClient.command("menu", botClientController.handleMenu);

botClient.action("receipt", botClientController.handleButtonReceipt);

botClient.action("questions", botClientController.handleButtonQuestions);
botClient.action("information", botClientController.handleButtonInfo);
botClient.action("custom_question", botClientController.handleCustomQuestion);

infoMessage.keyboard.text_options.forEach((option, index) => {
  botClient.action(`OPTION_${index}`, (ctx) => {
    ctx.reply(infoMessage.keyboard.text_response[index]);
  });
});

botClient.on("text", botClientController.handleResponseMessage);

botClient.on("callback_query", botClientController.handleButtonCallBack);

module.exports = botClient;
