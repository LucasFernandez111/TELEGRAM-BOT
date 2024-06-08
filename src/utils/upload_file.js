const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { uploadsBasePath, TOKEN_BOT_ADMIN } = require("../config/config");

const getFileLink = async (ctx) => {
  const { file_id } = ctx.update.message.document;

  const fileInfo = await ctx.telegram.getFile(file_id);
  const filePath = fileInfo.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${TOKEN_BOT_ADMIN}/${filePath}`;

  return fileUrl;
};

const uploadFile = async ({ pathUpload, URL, name }) => {
  const relativePath = path.join(uploadsBasePath, pathUpload);

  const writer = fs.createWriteStream(`${relativePath}/${name}`); //Crea flujo de escritura en relativePath

  const stream = await axios({
    url: URL,
    method: "GET",
    responseType: "stream",
  });

  stream.data.pipe(writer);

  writer.on("error", () => {
    throw Error(`${"🚫"}*Error al guardar el archivo*`);
  });
  writer.on("finish", () => {
    writer.end();
  });
  return `${relativePath}\\${name}`;
};

module.exports = { getFileLink, uploadFile };
