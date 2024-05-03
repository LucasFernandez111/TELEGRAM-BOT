const { Telegraf } = require("telegraf");
const { command } = require("./commands/command");

const bot = new Telegraf("6596583850:AAG5QRT84Tw-PZMHzfGgYqdW84zkajhzjoQ");

bot.start((ctx) => {
  ctx.reply("Hello");
});

bot.command("menu", (ctx) => {
  ctx.reply("Hi there!", {
    reply_markup: {
      inline_keyboard: [
        /* Inline buttons. 2 side-by-side */
        [
          { text: "Button 1", callback_data: "btn-1" },
          { text: "Button 2", callback_data: "btn-2" },
        ],

        /* One button */
        [{ text: "Next", pay: ctx.reply("jajajaja") }],

        /* Also, we can have URL buttons. */
        [{ text: "Open in browser", url: "telegraf.js.org" }],
      ],
    },
  });
});

bot.launch();
