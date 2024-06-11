const express = require("express");
const botAdmin = require("./bot/bot-admin/botAdmin");
const botClient = require("./bot/bot-client/botClient");
const botGroup = require("./bot/bot-group/botGroup");
const { PORT } = require("./config/config");

const app = express();

app.listen(PORT, () => {
  botAdmin.launch();
  botGroup.launch();
  botClient.launch();
});
