const path = require("path");

const date = new Date();
module.exports = {
  dateMadrid: date
    .toLocaleDateString("es-ES", { timeZone: "Europe/Madrid", hour12: false })
    .replace(/\//g, "-"),
  TOKEN_BOT_ADMIN: process.env.TOKEN_BOT_ADMIN,
  TOKEN_BOT_CLIENT: process.env.TOKEN_BOT_CLIENT,
  TOKEN_BOT_GROUP: process.env.TOKEN_BOT_GROUP,
  ID_GROUP: process.env.ID_GROUP,
  ID_CHAT_ALEX: process.env.ID_CHAT_ALEX,
  srcBasePath: path.resolve(__dirname, "../../src"),
  uploadsBasePath: path.resolve(__dirname, "../uploads"),
};
