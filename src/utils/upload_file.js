const { TOKEN_BOT_ADMIN } = require("../config/config");

// TODO: Extract the hardcoded token to a config file
const getFileLink = async (ctx) => {
  const { file_id } = ctx.message.document;
  const { file_path } = await ctx.telegram.getFile(file_id);
  const token = process.env.TOKEN_BOT_ADMIN;
  const fileUrl = `https://api.telegram.org/file/bot${token}/${file_path}`;

  return fileUrl;
};

module.exports = { getFileLink };
