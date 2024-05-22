const { Telegraf } = require("telegraf");
const botGroup = require("./bot/bot-group/botGroup");
const botClient = require("./bot/bot-client/botClient");
const botAdmin = require("./bot/bot-admin/botAdmin");
const { dbConnect } = require("./database/config/mongo");

// botAdmin.launch();
// botGroup.launch();
botClient.launch();
dbConnect().then(() => {
  console.log("Database Conectada");
});
