const { Telegraf, session } = require("telegraf");
const { startHandler } = require("./services/botAdmin_services");
const botAdminController = require("./controller/botAdmin_controller");
const stage = require("./services/scenes");
const { isAdmin } = require("./middleware/authMiddleware");

const botAdmin = new Telegraf(process.env.TOKEN_BOT_ADMIN);

botAdmin.use(session());

botAdmin.use(stage.middleware());

botAdmin.use(isAdmin);
botAdmin.start(startHandler);

// ACTIONS
botAdmin.action("button_automatic", botAdminController.handleButtonAutomatic);
botAdmin.action("button_no_publish", botAdminController.handleButtonDelete);
botAdmin.action("button_publish", botAdminController.handleButtonPublish);

module.exports = botAdmin;
