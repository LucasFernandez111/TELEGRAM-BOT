const { Markup } = require("telegraf");
const { getDocument } = require("../services/get_file");
const { handleError } = require("../utils/error_handle");
const { publicProduct } = require("../services/product");

const automatic = (ctx, bot) => {
  ctx.reply("Envia el archivo Excel");

  bot.on("document", async (ctx) => {
    try {
      const { response, path } = await getDocument(
        ctx,
        process.env.TOKEN_BOT_ADMIN
      );
      await ctx.replyWithMarkdownV2(response);

      await ctx.replyWithMarkdownV2(
        "¿Desea publicar el producto?",
        Markup.inlineKeyboard([
          Markup.button.callback("SI", "publicing"),
          Markup.button.callback("NO", "noPublicing"),
        ])
      );

      bot.action("publicing", (ctx) => publicProduct(ctx, path));
    } catch (error) {
      handleError(ctx, error);
    }
  });
};

module.exports = {
  automatic,
};
