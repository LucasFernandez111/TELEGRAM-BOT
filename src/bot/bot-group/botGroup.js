const { Telegraf } = require("telegraf");

const botGroup = new Telegraf(process.env.TOKEN_BOT_GROUP);

module.exports = botGroup;
