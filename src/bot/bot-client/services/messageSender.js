const { dateMadrid } = require("../../../utils/config");
const ID_CHAT_ALEX = process.env.ID_CHAT_ALEX;
const messageMap = new Map();

const senderMessage = async ({ chatId, message, telegram }) => {
  if (!message || !message.from || !message.text)
    throw Error("Mensaje no válido o incompleto...");
  const { from, text } = message;

  const sender = from.username || from.first_name;
  const messageSender = text;
  const senderId = from.id;

  const sentMessage = await telegram.sendMessage(
    ID_CHAT_ALEX,
    `📬¡Nuevo mensaje de "*${sender}*"!\n\n📩 Mensaje:*\n${messageSender}* \n\n🗓️ _${dateMadrid}_`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Bloquear 🚫", callback_data: "boton1" }]],
      },
    }
  );

  return messageMap.set(sentMessage.message_id, {
    chatId,
    senderId,
    messageSender,
    sender,
  });
};

module.exports = { senderMessage, messageMap };
