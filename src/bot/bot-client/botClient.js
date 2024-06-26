const { Telegraf, session } = require("telegraf");

const actionController = require("./controller/actionController");
const commandController = require("./controller/commandController");
const onController = require("./controller/onController");
const { infoMessage } = require("./utils/responses_es");
const stage = require("./services/scenes");
const { checkBlockedUser } = require("./middleware/moderation");
const { TOKEN_BOT_CLIENT } = require("../../config/config");
const { message } = require("telegraf/filters");
const botClient = new Telegraf(TOKEN_BOT_CLIENT);

botClient.use(checkBlockedUser);
botClient.use(session());
botClient.use(stage.middleware());
botClient.start(commandController.handleStart);
botClient.command("menu", commandController.handleMenu);
botClient.action("tutorial", actionController.handleButtonTutorial);
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

botClient.on(message("reply_to_message"), onController.handleResponseMessage);
botClient.on("callback_query", onController.handleButtonOptions);

module.exports = botClient;
