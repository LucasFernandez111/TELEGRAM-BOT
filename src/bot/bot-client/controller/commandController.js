const { handleError } = require("../../../utils/error_handle");

const { menuMessage, welcomeMessage } = require("../utils/responses_es"); // messages

const { menuKeyBoard } = require("../Views/keyboard"); //KeysBoard

const handleStart = (ctx) => {
  /**  /start */

  try {
    const username = ctx.from.username || "Amig@";

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
