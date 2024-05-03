/*const { command } = require("./commands/command");

const { insertProduct } = require("../../controller/product");

bot.start(async (ctx) => {
  const prod = {
    title: "Alarma",
    imgpath: "",
    url: "http://img//",
    description: "Producto de alarma para casas",
    key: "CACATUA",
  };

  const responseInsert = await insertProduct(prod);

  console.log(responseInsert);
  ctx.reply("Hello");
});

bot.command("menu", (ctx) => {
  ctx.reply("Hi there!", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Button 1", callback_data: "btn-1" },
          { text: "Button 2", callback_data: "btn-2" },
        ],


        [{ text: "Next", pay: ctx.reply("jajajaja") }],

        [{ text: "Open in browser", url: "telegraf.js.org" }],
      ],
    },
  });
});

*/
