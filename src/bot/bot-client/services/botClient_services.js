const axios = require("axios");
const fs = require("fs");
const path = require("path");

const sendReceipt = async (ctx, chat_id, data, file_name) => {
  ctx.telegram.sendDocument(process.env.ID_CHAT_ALEX, {
    source: data,
    filename: file_name,
  });
  const confirmMessage = await ctx.reply(
    "✅Comprobante enviado correctamente!"
  );

  setTimeout(() => {
    ctx.telegram.deleteMessage(
      confirmMessage.chat.id,
      confirmMessage.message_id
    );
  }, 4500);
};

/**
 * Uploads a file using the provided context.
 * @param {Object} ctx - The context object containing message and telegram properties.
 *
 */
const uploadFile = async ({ message, telegram }) => {
  const { file_id } = message.document || message.photo.pop();

  if (!file_id) throw Error("Archivo inválido!");

  const fileLink = await telegram.getFileLink(file_id);

  const fileNamePhoto = fileLink.pathname.split("/").pop();

  const fileNameDocument = message.document?.file_name;

  const fileName = fileNameDocument || fileNamePhoto;

  const filePath = path.resolve(
    __dirname,
    "../../../uploads/receipt",
    fileName
  );

  const response = await axios({
    url: fileLink.href,
    method: "GET",
    responseType: "stream",
  });

  const writer = await fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    response.data.pipe(writer);
    response.data.on("end", () => {
      writer.close();
      resolve();
    });
    response.data.on("error", reject);
  });

  return { fileName, filePath, fileLink };
};

module.exports = {
  sendReceipt,
  uploadFile,
};
