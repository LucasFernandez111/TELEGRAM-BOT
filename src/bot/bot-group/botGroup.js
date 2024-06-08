const { Telegraf } = require("telegraf");
const { TOKEN_BOT_GROUP } = require("../../config/config");

const botGroup = new Telegraf(TOKEN_BOT_GROUP);

module.exports = botGroup;
