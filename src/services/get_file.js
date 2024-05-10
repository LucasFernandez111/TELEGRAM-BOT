const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { handleError } = require("../utils/error_handle");
const getDocument = async (ctx, tokenBot) => {
  try {
    const document = ctx.update.message.document;

    const { file_id, mime_type, file_name } = document;

    if (
      !document ||
      mime_type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
      throw Error(`${"🚫"}*No es un archivo EXCEL*`);
    if (!tokenBot) throw Error(`${"🚫"}*Token BOT no valido*`);

    const fileInfo = await ctx.telegram.getFile(file_id);
    const filePath = fileInfo.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${tokenBot}/${filePath}`;
    const relativePath = path.join(__dirname, `../archive/${file_name}`);

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

    return {
      response: "Excel cargado correctamente",
      path: relativePath,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getDocument };
