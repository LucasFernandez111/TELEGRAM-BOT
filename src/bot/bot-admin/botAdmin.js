const { Telegraf } = require("telegraf");
const { startHandler } = require("./services/botAdmin_services");
const botAdminController = require("./controller/botAdmin_controller");
const { uploadMiddleware } = require("./middleware/botAdmin_middleware");

const botAdmin = new Telegraf(process.env.TOKEN_BOT_ADMIN);

botAdmin.start(startHandler);

botAdmin.action("button_automatic", botAdminController.handleButtonAutomatic);

botAdmin.on(
  "document",
  uploadMiddleware,
  botAdminController.handleButtonAutomaticOn
);

botAdmin.action("button_no_publish");
botAdmin.action("button_publish", botAdminController.handleButtonPublish);

module.exports = botAdmin;
