const { handleError } = require("../../../utils/error_handle");
const { getInfoUser } = require("../../../utils/getInfoUser");

const { menuMessage, welcomeMessage } = require("../utils/responses_es"); // messages

const { menuKeyBoard } = require("../Views/keyboard"); //KeysBoard

const handleStart = (ctx) => {
  /**  /start */

  try {
    const { username } = getInfoUser(ctx);

    ctx.replyWithMarkdown(welcomeMessage.startMessage(username));
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleMenu = (ctx) => {
  /**  /menu */
  ctx.replyWithMarkdown(menuMessage.messageDos, menuKeyBoard);
};

module.exports = {
  handleStart,
  handleMenu,
};
