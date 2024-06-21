const { Scenes } = require("telegraf");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const { getFileLink } = require("../../../utils/upload_file");
const {
  readExcelFile,
  getSheetData,
  createNewExcel,
  getElementsExcel,
  getOtherElementsExcel,
  updateExcel,
  getLinkYupoo,
} = require("./excelHandler");
const { deleteAllFiles, downloadFile } = require("../../../utils/files");
const path = require("path");
const { handleError } = require("../../../utils/error_handle");

const { formatToSend } = require("./botAdmin_services");
const { sendPost } = require("./publishPost");
const {
  dateMadrid,
  publishBasePath,
  loadBasePath,
  imagesBasePath,
} = require("../../../config/config");
const clusterAli = require("../../../scraping/clusters/clusterAli");
const clusterYupoo = require("../../../scraping/clusters/clusterYup");
const clusterImages = require("../../../scraping/clusters/clusterImages");

const getDocument = new Scenes.WizardScene(
  "get_document_scene",
  (ctx) => {
    ctx.reply("📎 Envía adjunto el archivo Excel");

    ctx.wizard.state.timeout = setTimeout(() => {
      ctx.reply(
        "Tiempo de espera para el archivo. Por favor, intenta nuevamente."
      );
      ctx.scene.leave();
    }, 20000);
    ctx.wizard.next();
  },

  async (ctx) => {
    try {
      clearTimeout(ctx.wizard.state.timeout);
      uploadMiddleware(ctx);
      const fileLink = await getFileLink(ctx); // Link Telegram file

      const pathExcel = await downloadFile({
        destinationPath: loadBasePath,
        fileUrl: fileLink,
      });

      const workBook = await readExcelFile(pathExcel);

      await deleteAllFiles({
        directoryPath: loadBasePath,
      });

      const linkYupoo = getLinkYupoo(workBook);

      const sheetData = getSheetData(workBook); // formatea Excel original

      ctx.reply("¡Excel cargado con éxito! ✅📊!");

      ctx.reply("Creando un nuevo archivo Excel... 📊✨");

      const pathNewExcel = await createNewExcel({
        products: sheetData,
        linkYupoo,
        pathFile: path.join(loadBasePath, `${dateMadrid}.xlsx`),
      });

      await ctx.replyWithDocument({
        source: pathNewExcel,
      });

      await deleteAllFiles({
        directoryPath: loadBasePath,
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
    ctx.wizard.state.timeout = setTimeout(() => {
      ctx.reply(
        "Tiempo de espera para el archivo. Por favor, intenta nuevamente."
      );
      ctx.scene.leave();
    }, 40000);
    ctx.wizard.next();
  },
  async (ctx) => {
    try {
      clearTimeout(ctx.wizard.state.timeout);
      await uploadMiddleware(ctx);
      const file_id = ctx.update.message.document.file_id;
      const fileLink = await getFileLink(ctx); // Link Telegram file

      const excelPath = await downloadFile({
        destinationPath: publishBasePath,
        fileUrl: fileLink,
      });

      const workBook = await readExcelFile(excelPath);

      const pathDirExcel = path.dirname(excelPath);

      const products = getElementsExcel({ workBook }); //Elementos a publicar

      const { codes, urls, lastRow } = getOtherElementsExcel({ workBook }); //Elementos a guardar

      const messageProgress = await ctx.reply("🔄 Obteniendo productos...");

      const productsAli = await clusterAli({
        urls: products?.urls,
        codes: products?.codes,
        ctx,
      });

      if (productsAli.length == 0)
        throw Error("Todos los enlaces estan caidos 🔙...");

      await ctx.reply("Datos recopilados de Aliexpress... ✅🔄 ");

      const productsYupoo = await clusterYupoo({
        urls: products?.yupoo,
        codes: products?.codes,
        ctx,
      });

      if (productsYupoo.length == 0)
        throw Error("Hubo un error con los enlaces de Yupoo...");
      await ctx.reply("Reopilando imagenes de Yupoo 📸...");
      const listpath = await clusterImages({
        urls: productsYupoo,
      });

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        messageProgress.message_id,
        null,
        "📢 Publicando..."
      );
      const productsFormated = await formatToSend({
        productsAli,
        productsYupoo,
        listpath,
      });

      await Promise.all(
        productsFormated.map(async (product) => await sendPost(product))
      );

      if (codes.length == 0 || urls.length == 0) {
        ctx.reply("✅📦 ¡Todos los productos de la tabla han sido publicados!");
      } else {
        await updateExcel({
          workBook,
          codes,
          urls,
          lastRow,
          path: path.join(pathDirExcel, `${file_id}.xlsx`),
        });
        await ctx.replyWithDocument({
          source: path.join(pathDirExcel, `${file_id}.xlsx`),
        });
        await deleteAllFiles({ directoryPath: pathDirExcel });
      }

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        messageProgress.message_id,
        null,
        "✅ Productos Publicados"
      );

      ctx.scene.leave();
    } catch (error) {
      ctx.reply("Vuelve a intentarlo..");

      handleError(ctx, error);
    } finally {
      deleteAllFiles({ directoryPath: publishBasePath });
      deleteAllFiles({
        directoryPath: imagesBasePath,
      });

      ctx.scene.leave();
    }
  }
);
module.exports = new Scenes.Stage([getDocument, publishElements]);
