const { Telegraf, session } = require("telegraf");

const actionController = require("./controller/actionController");
const commandController = require("./controller/commandController");
const onController = require("./controller/onController");
const { infoMessage } = require("./utils/responses_es");
const { blockOtherHandlers } = require("./middleware/scenes_midleware");
const stage = require("./services/scenes");
const { checkBlockedUser } = require("./middleware/moderation");

const botClient = new Telegraf(process.env.TOKEN_BOT_CLIENT);

botClient.use(checkBlockedUser);
botClient.use(session());
botClient.use(stage.middleware());
botClient.use(blockOtherHandlers);

botClient.start(commandController.handleStart);
botClient.command("menu", commandController.handleMenu);

botClient.action("receipt", actionController.handleButtonReceipt);
botClient.action("questions", actionController.handleButtonQuestions);
botClient.action("information", actionController.handleButtonInfo);
botClient.action("custom_question", actionController.handleCustomQuestion);
botClient.action("block_user", actionController.handleBlockUser);
botClient.action("unlock_user", actionController.handleUnlockUser);
infoMessage.keyboard.text_options.forEach((option, index) => {
  botClient.action(`OPTION_${index}`, (ctx) => {
    ctx.reply(infoMessage.keyboard.text_response[index]);
  });
});

botClient.on("reply_to_message", onController.handleResponseMessage);
botClient.on("callback_query", onController.handleButtonOptions);

module.exports = botClient;
