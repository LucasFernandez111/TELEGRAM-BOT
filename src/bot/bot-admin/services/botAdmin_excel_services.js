const XlsxPopulate = require("xlsx-populate");

const readExcelFile = async (filePath) => {
  const workBook = await XlsxPopulate.fromFileAsync(filePath);

  return workBook;
};

const parseExcelFile = (workBook) => {
  let productAll = [];
  let yupooUrl = [];
  const sheetNames = workBook.sheets().map((sheet) => sheet.name());

  sheetNames.map((name) => {
    const sheet = workBook.sheet(name);
    const usedRange = sheet.usedRange(); // Obtener el rango usado de la hoja
    const lastRowNumber = usedRange.endCell().rowNumber(); // Última fila con datos

    const rowNumbers = Array.from({ length: lastRowNumber }, (_, i) => i + 1);

    const values = rowNumbers
      .map((rowNumber) => sheet.cell(`D${rowNumber}`).value())
      .filter((value) => value !== undefined);

    yupooUrl.push(...values);

    const res = usedRange.value().map((row) => {
      const filteredRow = row.filter((value) => value !== undefined);

      const code = filteredRow[0];
      const url = filteredRow[1]?.split("?", 1)[0];

      return {
        code,
        url,
      };
    });

    const filteredRes = res
      .slice(1)
      .filter((obj) => obj.code !== undefined || obj.url !== undefined);

    filteredRes.forEach((product) => productAll.push(product));
  });

  return {
    yupooUrl,
    productAll,
  };
};

module.exports = {
  readExcelFile,
  parseExcelFile,
};
