const botGroup = require("./bot/bot-group/botGroup");
const botClient = require("./bot/bot-client/botClient");
const botAdmin = require("./bot/bot-admin/botAdmin");
const { dbConnect } = require("./database/config/mongo");

botAdmin
  .launch()
  .then(() => console.log("Admin Bot Conectado"))
  .catch((error) => console.log(error));
botGroup
  .launch()
  .then(() => console.log("Group Bot Conectado"))
  .catch((error) => console.log(error));
botClient
  .launch()
  .then(() => console.log("Client Bot Conectado"))
  .catch((error) => console.log(error));
dbConnect().then(() => {
  console.log("Database Conectada");
});
