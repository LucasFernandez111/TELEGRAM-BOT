const { blockedUsers } = require("../../../utils/shared");

const blockUser = async ({ userId }) => {
  try {
    await blockedUsers.add(userId);
  } catch (error) {
    console.log(error);
    throw Error("Hubo un problema al intentar banear al usuario...");
  }
};

const unlockUser = async ({ userId }) => {
  try {
    await blockedUsers.delete(userId);
  } catch (error) {
    throw Error("Hubo un problema al intentar desbanear al usuario...");
  }
};

module.exports = {
  blockUser,
  unlockUser,
};
