const XlsxPopulate = require("xlsx-populate");

const readExcelFile = async (filePath) => {
  const workBook = await XlsxPopulate.fromFileAsync(filePath);

  return workBook;
};

const parseExcelFile = (workBook) => {
  let productAll = [];

  const sheetNames = workBook.sheets().map((sheet) => sheet.name());
  const yupooUrl = workBook.sheet(0).cell("C1").value();

  if (!yupooUrl) {
    throw Error("No se encontro la URL de yupoo en ('C1') !");
  }

  if (!yupooUrl.includes("yupoo.com"))
    throw Error("No es una URL de yupoo en ('C1')!");

  try {
    sheetNames.forEach((name) => {
      const sheet = workBook.sheet(name);

      const usedRange = sheet.usedRange();
      if (!usedRange) {
        throw new Error(`No se pudo obtener el rango usado de la hoja ${name}`);
      }

      const res = usedRange.value().map((row) => {
        if (!row) return [];

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
      productAll,
      yupooUrl,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  readExcelFile,
  parseExcelFile,
};
