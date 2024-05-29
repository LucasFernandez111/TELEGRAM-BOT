const fs = require("fs");

//FUNCIONES PARA ARCHIVOS EN GENERAL

const deleteAllFile = ({ relativePath }) => {
  fs.readdir(relativePath, (err, files) => {
    if (err) {
      console.error("Error al leer el directorio:", err);
      return;
    }

    if (files.length <= 0) throw Error("No hay archivos guardados");
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

module.exports = { deleteAllFile };
