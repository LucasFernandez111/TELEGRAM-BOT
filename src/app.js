const { Telegraf } = require("telegraf");
const { dbConnect } = require("./config/mongo");

const botAdmin = new Telegraf(process.env.KEY_BOT_ADMIN);
//const botClient = new Telegraf(process.env.KEY_BOT_CLIENT);
//const botGroup = new Telegraf(process.env.KEY_BOT_GROUP);

botAdmin.launch();
//botClient.launch();
//botGroup.launch();

dbConnect().then(() => {
  console.log("Database Conectada");
});
