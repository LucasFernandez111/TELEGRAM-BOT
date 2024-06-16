const express = require("express");
const botAdmin = require("./bot/bot-admin/botAdmin");
const botClient = require("./bot/bot-client/botClient");
const botGroup = require("./bot/bot-group/botGroup");
const { PORT } = require("./config/config");

const app = express();

app.listen(PORT, () => {
  botAdmin
    .launch(() => console.log("Bot Admin activado"))
    .catch((error) => {
      console.log("El bot admin fallo: ", error);
    });
  botClient
    .launch(() => console.log("Bot Client activado"))
    .catch((error) => {
      console.log("El bot cliente fallo: ", error);
    });
  botGroup
    .launch(() => console.log("Bot Group activado"))
    .catch((error) => {
      console.log("El bot grupo fallo: ", error);
    });
});
