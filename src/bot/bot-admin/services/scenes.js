const { Scenes } = require("telegraf");
const { uploadMiddleware } = require("../middleware/botAdmin_middleware");
const { getFileLink, uploadFile } = require("../../../utils/upload_file");
const {
  readExcelFile,
  parseExcelFile,
  createNewExcel,
  getElementsExcel,
  getOtherElementsExcel,
  updateExcel,
} = require("./botAdmin_excel_services");
const { deleteAllFile } = require("../../../utils/files");
const path = require("path");

const { dateMadrid } = require("../../../utils/date");
const { handleError } = require("../../../utils/error_handle");

const getDocument = new Scenes.WizardScene(
  "get_document_scene",
  (ctx) => {
    ctx.reply("📎 Envía adjunto el archivo Excel");

    ctx.wizard.next();
  },

  async (ctx) => {
    try {
      uploadMiddleware(ctx);
      const fileLink = await getFileLink(ctx); // Link Telegram file

      const excelPath = await uploadFile({
        pathUpload: "/document/load",
        URL: fileLink,
        name: "document.xlsx",
      }); //upload File

      ctx.reply("¡Excel cargado con éxito! ✅📊!");

      const workBook = await readExcelFile(excelPath); // Obtiene el workBook del documento original

      const products = await parseExcelFile(workBook); // Parsea Excel original

      const pathNewExcel = await createNewExcel(products);
      ctx.reply("Creando un nuevo archivo Excel... 📊✨");
      await ctx.replyWithDocument({
        source: pathNewExcel,
      });

      const newExcelPathDir = path.dirname(pathNewExcel);
      const excelPathDir = path.dirname(excelPath);

      deleteAllFile({
        relativePath: newExcelPathDir,
      });

      deleteAllFile({
        relativePath: excelPathDir,
      });

      ctx.scene.leave();
    } catch (error) {
      handleError(ctx, error);

      ctx.scene.reenter();
    }
  }
);

const publishElements = new Scenes.WizardScene(
  "publish_elements_scene",
  (ctx) => {
    ctx.replyWithMarkdownV2("Ajunta archivo *EXCEL* para ser publicada 📢");
    ctx.wizard.next();
  },
  async (ctx) => {
    try {
      await uploadMiddleware(ctx);
      const { file_id } = ctx.update.message.document;
      const fileLink = await getFileLink(ctx); // Link Telegram file
      const excelPath = await uploadFile({
        pathUpload: "/document/publish",
        URL: fileLink,
        name: `update-${file_id}-${dateMadrid}.xlsx`,
      }); //upload File

      const workBook = await readExcelFile(excelPath);

      const pathDirExcel = path.dirname(excelPath);

      const products = getElementsExcel({ workBook }); //Elementos a publicar

      const { codes, urls, lastRow } = getOtherElementsExcel({ workBook }); //Elementos a guardar

      await updateExcel({
        workBook,
        codes,
        urls,
        lastRow,
        path: `${pathDirExcel}/${file_id}.xlsx`,
      });

      await ctx.replyWithDocument({
        source: `${pathDirExcel}/${file_id}.xlsx`,
      });

      await deleteAllFile({ relativePath: pathDirExcel });
      ctx.wizard.next();
    } catch (error) {
      handleError(ctx, error);
      ctx.scene.reenter();
    }
  }
);
module.exports = new Scenes.Stage([getDocument, publishElements]);
