const path = require("path");
const axios = require("axios");
const fs = require("fs");

const getFileLink = async (ctx) => {
  const document = ctx.update.message.document;
  const tokenBot = process.env.TOKEN_BOT_ADMIN;

  const { file_id } = document;

  const fileInfo = await ctx.telegram.getFile(file_id);
  const filePath = fileInfo.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${tokenBot}/${filePath}`;

  return fileUrl;
};

const uploadFile = async (pathUpload, fileUrl, fileName) => {
  const relativePath = path.join(__dirname, "../uploads", pathUpload);

  const writer = fs.createWriteStream(`${relativePath}/${fileName}`); //Crea flujo de escritura en relativePath

  const stream = await axios({
    url: fileUrl,
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
  return `${relativePath}\\${fileName}`;
};

const downloadImage = async (fileUrl) => {
  const fileNameSplit = fileUrl.split("/");
  const fileName = fileNameSplit.slice(-1)[0];

  const relativePath = path.join(
    __dirname,
    `../images/${fileName.replace(".webp", ".jpg")}`
  );
  const writer = fs.createWriteStream(relativePath);

  const response = await axios({
    url: fileUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  writer.on("error", () => {
    throw Error(`${"🚫"}*Error al guardar el archivo*`);
  });

  return relativePath;
};

module.exports = { getFileLink, downloadImage, uploadFile };
