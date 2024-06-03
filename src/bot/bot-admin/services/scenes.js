const { Scenes } = require("telegraf");
const { uploadMiddleware } = require("../middleware/botAdmin_middleware");
const { getFileLink, uploadFile } = require("../../../utils/upload_file");
const {
  readExcelFile,
  getSheetData,
  createNewExcel,
  getElementsExcel,
  getOtherElementsExcel,
  updateExcel,
  getLinkYupoo,
} = require("./botAdmin_excel_services");
const { deleteAllFile } = require("../../../utils/files");
const path = require("path");

const { handleError } = require("../../../utils/error_handle");
const { getPageData, getImagePage } = require("../../../utils/scraping");
const { formatToSend } = require("./botAdmin_services");
const { uploadsBasePath, dateMadrid } = require("../../../utils/config");

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

      const pathExcel = await uploadFile({
        pathUpload: "/document/load",
        URL: fileLink,
        name: "document.xlsx",
      }); //upload File

      const workBook = await readExcelFile(pathExcel);
      deleteAllFile({
        relativePath: path.dirname(pathExcel),
      });

      const linkYupoo = getLinkYupoo(workBook);

      const sheetData = getSheetData(workBook); // formatea Excel original

      ctx.reply("¡Excel cargado con éxito! ✅📊!");

      const pathFile = path.resolve(
        uploadsBasePath,
        "document",
        "new",
        `new-document-${dateMadrid}.xlsx`
      );

      ctx.reply("Creando un nuevo archivo Excel... 📊✨");

      const pathNewExcel = await createNewExcel({
        products: sheetData,
        linkYupoo,
        pathFile,
      });

      await ctx.replyWithDocument({
        source: pathNewExcel,
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

      // await updateExcel({
      //   workBook,
      //   codes,
      //   urls,
      //   lastRow,
      //   path: `${pathDirExcel}/${file_id}.xlsx`,
      // });

      const productsAli = await getPageData(products.urls, products.codes, ctx);

      // if (productsAli.length == 0)
      //   throw Error("No se pudo completar la publicaciones...");

      const productsYupoo = await getPageData(products.yupoo, products.codes);

      const pathImages = await getImagePage({
        urls: productsYupoo,
      });

      console.log({ products, productsAli, productsYupoo, pathImages });

      // await ctx.replyWithDocument({
      //   source: `${pathDirExcel}/${file_id}.xlsx`,
      // });

      // await formatToSend(products, productsYupoo, listpath);

      await deleteAllFile({ relativePath: pathDirExcel });

      // await deleteAllFile({
      //   relativePath: path.resolve(__dirname, "../../../uploads", "images"),
      // });
      ctx.wizard.next();
    } catch (error) {
      ctx.reply("Vuelve a intentarlo..");
      ctx.scene.leave();
      handleError(ctx, error);
    }
  }
);
module.exports = new Scenes.Stage([getDocument, publishElements]);
