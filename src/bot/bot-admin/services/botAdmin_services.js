const fs = require("fs/promises");
const path = require("path");
const { welcomeMessage } = require("../utils/responses_en");
const { Markup } = require("telegraf");

const startHandler = (ctx) => {
  const { startMessage, keyBoard } = welcomeMessage;
  const { text_manual, text_automatic, callback_automatic, callback_manual } =
    keyBoard;
  ctx.replyWithMarkdown(
    startMessage,
    Markup.inlineKeyboard([
      [Markup.button.callback(text_automatic, callback_automatic)],
      [Markup.button.callback("📌 Publicar productos", "button_publish")],
    ])
  );
};

const getFileXlsx = async (ctx) => {
  const dirPathDocument = path.join(
    __dirname,
    "../../../uploads/document/loadDocuments/"
  );

  const files = await fs.readdir(dirPathDocument);
  const fileName = files[0];

  console.log(files);

  const filePath = path.join(
    __dirname,
    `../../../uploads/document/loadDocuments/${fileName}`
  );

  if (!fileName) throw new Error("Ningun archivo guardado");

  if (files.length > 1) throw new Error("Mas de 1 archivo guardado ");

  return filePath;
};

const formatToSend = (productsAli, productsYupoo, listpath) => {};

formatToSend(
  {
    codes: ["B2334", "B2392", "B3174", "B3190", "B3233"],
    urls: [
      "https://www.aliexpress.com/item/3256806852442201.html",
      "https://www.aliexpress.com/item/3256806852689975.html",
      "https://www.aliexpress.com/item/3256806852799850.html",
      "https://www.aliexpress.com/item/3256806852812869.html",
      "https://www.aliexpress.com/item/3256806852911819.html",
    ],
    yupoo: ["https://zxd1688.x.yupoo.com/"],
  },
  [
    {
      titleCode: "B2334",
      href: "https://zxd1688.x.yupoo.com/albums/164475814?uid=1",
    },
    {
      titleCode: "B2392",
      href: "https://zxd1688.x.yupoo.com/albums/164475821?uid=1",
    },
    {
      titleCode: "B3174",
      href: "https://zxd1688.x.yupoo.com/albums/164475828?uid=1",
    },
    {
      titleCode: "B3190",
      href: "https://zxd1688.x.yupoo.com/albums/164475831?uid=1",
    },
    {
      titleCode: "B3233",
      href: "https://zxd1688.x.yupoo.com/albums/164475836?uid=1",
    },
  ],
  [
    "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\uploads\\images\\164475821.png",
    "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\uploads\\images\\164475814.png",
    "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\uploads\\images\\164475828.png",
    "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\uploads\\images\\164475831.png",
    "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT\\src\\uploads\\images\\164475836.png",
  ]
);
module.exports = {
  startHandler,

  getFileXlsx,
  formatToSend,
};
