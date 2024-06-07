const { Telegraf, session } = require("telegraf");
const { startHandler } = require("./services/botAdmin_services");
const actionController = require("./controller/action");
const stage = require("./services/scenes");
const { isAdmin } = require("./middleware/authMiddleware");

const botAdmin = new Telegraf(process.env.TOKEN_BOT_ADMIN);

botAdmin.use(session());

botAdmin.use(stage.middleware());

botAdmin.use(isAdmin);
botAdmin.start(startHandler);

// ACTIONS
botAdmin.action("button_automatic", actionController.handleButtonAutomatic);
botAdmin.action("button_publish", actionController.handleButtonPublish);

module.exports = botAdmin;
