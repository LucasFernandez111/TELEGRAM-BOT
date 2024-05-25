const axios = require("axios");
const fs = require("fs");
const path = require("path");
const messageMap = new Map();

const sendMessageUser = async ({ message, telegram }) => {
  try {
    if (!message || !message.from || !message.text) {
      throw new Error(
        "Mensaje no válido o incompleto, presione el botton nuevamente!."
      );
    }

    const ID_CHAT_ALEX = process.env.ID_CHAT_ALEX;
    const sender = message.from.username || message.from.first_name;
    const messageUser = message.text;
    const userId = message.from.id;

    const date = new Date();
    const options = { timeZone: "Europe/Madrid", hour12: false };
    const horaEspaña = date.toLocaleString("es-ES", options);

    const sentMessage = await telegram.sendMessage(
      ID_CHAT_ALEX,
      `📬¡Nuevo mensaje de *${sender}*!\n\n📩 Mensaje:*\n${messageUser}* \n\nFECHA:${horaEspaña}`,
      {
        parse_mode: "Markdown",
      }
    );

    messageMap.set(sentMessage.message_id, { userId, messageUser, sender });
  } catch (error) {
    throw new Error(error);
  }
};

/**CAMBIAR ID DE ALEXXXXXXX */
const responseMessage = async (ctx) => {
  const isResMessage = ctx.message.reply_to_message;

  if (!isResMessage) return;

  const repliedMessageId = ctx.message.reply_to_message.message_id;
  const adminResponse = ctx.message.text;
  const messageInfo = messageMap.get(repliedMessageId);
  if (!messageInfo) throw Error("Mensaje ya respondido! ");
  const { messageUser, sender } = messageInfo;

  await ctx.telegram.sendMessage(
    5519333143,
    `¡Hola *${sender}*!,\n\n✅ Su consulta ha sido atendida con éxito.\n\n❓: ${messageUser} \n\n📨 Respuesta: \n- *${adminResponse}*`,
    {
      parse_mode: "Markdown",
    }
  );

  const confirmMessage = await ctx.reply("✅Mensaje enviado con exito!");

  setTimeout(() => {
    ctx.telegram.deleteMessage(
      confirmMessage.chat.id,
      confirmMessage.message_id
    );
  }, 3000);

  messageMap.delete(repliedMessageId);
};

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

const deleteAllFile = (relativePath) => {
  fs.readdir(relativePath, (err, files) => {
    if (err) {
      console.error("Error al leer el directorio:", err);
      return;
    }

    files.forEach((file) => {
      fs.unlink(`${relativePath}/${file}`, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo ${file}:`, err);
        } else {
          console.log(`Archivo ${file} eliminado correctamente.`);
        }
      });
    });
  });
};

module.exports = deleteAllFile;

module.exports = {
  sendMessageUser,
  responseMessage,
  sendReceipt,
  uploadFile,
  deleteAllFile,
};
