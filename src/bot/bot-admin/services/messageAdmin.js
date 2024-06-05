const { messageMap } = require("../../bot-client/services/messageSender");

const sendAdminResponse = async ({ message, telegram }) => {
  const isResMessage = message.reply_to_message;

  if (!isResMessage) return; // verifica si es una respuesta

  const repliedMessageId = message.reply_to_message.message_id;
  const adminResponse = message.text;
  const messageSenderInfo = messageMap.get(repliedMessageId);

  if (!messageSenderInfo) return;
  const { messageSender, sender, chatId } = messageSenderInfo;

  await telegram.sendMessage(
    chatId,
    `¡Hola *${sender}*!,\n\n✅ Su consulta ha sido atendida con éxito.\n\n❓: ${messageSender} \n\n📨 Respuesta: \n- *${adminResponse}*`,
    {
      parse_mode: "Markdown",
    }
  );

  return messageMap.delete(repliedMessageId);
};

module.exports = {
  sendAdminResponse,
};
