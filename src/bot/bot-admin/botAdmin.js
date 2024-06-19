const { Telegraf, session } = require("telegraf");
const { startHandler } = require("./services/botAdmin_services");
const commandController = require("./controller/command");
const actionController = require("./controller/action");
const stage = require("./services/scenes");
const { isAdmin } = require("./middleware/authMiddleware");
const { TOKEN_BOT_ADMIN } = require("../../config/config");

const botAdmin = new Telegraf(TOKEN_BOT_ADMIN);

botAdmin.use(session());
botAdmin.use(stage.middleware());
botAdmin.use(isAdmin);

botAdmin.start(startHandler);
botAdmin.command("delete", commandController.handleCommandDelete);

// ACTIONS
botAdmin.action("button_automatic", actionController.handleButtonAutomatic);
botAdmin.action("button_publish", actionController.handleButtonPublish);

module.exports = botAdmin;
