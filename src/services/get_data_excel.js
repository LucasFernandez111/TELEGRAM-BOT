const XlsxPopulate = require("xlsx-populate");

const readExcelFile = async (filePath) => {
  const workBook = await XlsxPopulate.fromFileAsync(filePath);

  return workBook;
};

const parseExcelFile = (workBook) => {
  let productAll = [];
  const sheetNames = workBook.sheets().map((sheet) => sheet.name());

  sheetNames.map((name) => {
    const result = workBook.sheet(name).usedRange().value();

    const res = result.map((row) => {
      const filteredRow = row.filter((value) => value !== undefined);
      return {
        code: filteredRow[0],
        url: filteredRow[1],
      };
    });

    const filteredRes = res
      .slice(1)
      .filter((obj) => obj.code !== undefined || obj.url !== undefined);

    filteredRes.forEach((product) => productAll.push(product));
  });

  return productAll;
};

module.exports = {
  readExcelFile,
  parseExcelFile,
};
