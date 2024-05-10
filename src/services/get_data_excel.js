const path = require("path");
const XlsxPopulate = require("xlsx-populate");

const readExcelFile = async (filePath) => {
  try {
    const workBook = await XlsxPopulate.fromFileAsync(filePath);

    return workBook;
  } catch (error) {
    console.log("Error al leer archivo", error);
  }
};

const parseExcelFile = (workBook) => {
  const sheetNames = workBook.sheets().map((sheet) => sheet.name());

  const sheetData = sheetNames.map((name) =>
    workBook.sheet(name).usedRange().value()
  );

  const rowData = sheetData[0].slice(1).map((row) => {
    return {
      code: row[0],
      url: row[1],
    };
  });

  const filteredData = rowData.filter(
    (obj) => obj.code !== undefined && obj.url !== undefined
  );

  return filteredData;
};

module.exports = {
  readExcelFile,
  parseExcelFile,
};
