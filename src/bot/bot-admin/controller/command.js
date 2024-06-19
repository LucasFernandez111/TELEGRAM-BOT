const {
  publishBasePath,
  loadBasePath,
  imagesBasePath,
} = require("../../../config/config");
const { handleError } = require("../../../utils/error_handle");
const { deleteAllFiles } = require("../../../utils/files");

const handleCommandDelete = async (ctx) => {
  try {
    await deleteAllFiles({ directoryPath: publishBasePath });
    await deleteAllFiles({ directoryPath: loadBasePath });
    await deleteAllFiles({ directoryPath: imagesBasePath });

    ctx.reply("✅ Se ha eliminado los archivos correctamente");
  } catch (error) {
    handleError(ctx, error);
  }
};

module.exports = { handleCommandDelete };
