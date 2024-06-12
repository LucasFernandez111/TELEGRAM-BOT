const fs = require("fs");
const path = require("path");
const axios = require("axios");
//FUNCIONES PARA ARCHIVOS EN GENERAL

const downloadFile = async ({ destinationPath, fileUrl }) => {
  const fileName = path.basename(fileUrl);
  const filePath = path.join(destinationPath, fileName);

  const writeStream = fs.createWriteStream(filePath);
  const response = await axios({
    url: fileUrl,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", () =>
      reject(`Error al guardar el archivo: ${fileName}`)
    );
  });
};

const deleteAllFiles = async ({ directoryPath }) => {
  const files = await fs.promises.readdir(directoryPath);

  if (files.length === 0) {
    throw new Error("No hay archivos guardados");
  }

  await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(directoryPath, fileName);
      await fs.promises.unlink(filePath);
    })
  );
};

module.exports = { deleteAllFiles, downloadFile };
