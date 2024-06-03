const botClient = require("../botClient");

const blockUser = async ({ chatId, userId }) => {
  try {
    await botClient.telegram.banChatMember(chatId, userId);
  } catch (error) {
    throw Error("Hubo un problema al intentar banear al usuario...");
  }
};

const unlockUser = async ({ chatId, userId }) => {
  try {
    await botClient.telegram.unbanChatMember(chatId, userId);
  } catch (error) {
    throw Error("Hubo un problema al intentar desbanear al usuario...");
  }
};

module.exports = {
  blockUser,
  unlockUser,
};
