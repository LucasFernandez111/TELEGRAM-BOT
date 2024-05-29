const { Scenes } = require("telegraf");
const { uploadMiddleware } = require("../middleware/botAdmin_middleware");
const { getFileLink, uploadFile } = require("../../../utils/upload_file");
const {
  readExcelFile,
  parseExcelFile,
  createNewExcel,
  getElementsExcel,
} = require("./botAdmin_excel_services");
const { deleteAllFile } = require("../../../utils/files");
const path = require("path");
const getDocument = new Scenes.WizardScene(
  "get_document_scene",
  (ctx) => {
    ctx.reply("📎 Envía adjunto el archivo Excel");

    ctx.wizard.next();
  },

  async (ctx) => {
    try {
      // uploadMiddleware(ctx);
      const fileLink = await getFileLink(ctx); // Link Telegram file

      ctx.session.excelPath = await uploadFile({
        pathUpload: "/document/loadDocuments",
        URL: fileLink,
        name: "document.xlsx",
      }); //upload File

      ctx.reply("¡Excel cargado con éxito! ✅📊!");

      const excelPath = ctx.session.excelPath;

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
    }
  }
);

const publishElements = new Scenes.WizardScene(
  "publish_elements_scene",
  (ctx) => {
    ctx.reply("Ajunta archivo *EXCEL* para ser publicado📢");
    ctx.wizard.next();
  },

  (ctx) => {
    // getElementsExcel({workBook: })

    ctx.scene.leave();
  }
);
module.exports = new Scenes.Stage([getDocument, publishElements]);
