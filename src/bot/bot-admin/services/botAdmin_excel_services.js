const XlsxPopulate = require("xlsx-populate");
const path = require("path");
const { dateMadrid } = require("../../../utils/date");

const readExcelFile = async (filePath) => {
  const workBook = await XlsxPopulate.fromFileAsync(filePath);

  if (!workBook) throw Error("Problemas al leer el archivo Excel");

  return workBook;
};

const parseExcelFile = (workBook) => {
  let products = [];

  const sheetNames = workBook.sheets().map((sheet) => sheet.name());
  const yupooUrl = workBook.sheet(0).cell("C1").value();

  if (!yupooUrl) {
    throw Error("No se encontro la URL de yupoo en ('C1') !");
  }

  if (!yupooUrl.includes("yupoo.com"))
    throw Error("No es una URL de yupoo en ('C1')!");

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

    filteredRes.forEach((product) => products.push(product));
  });

  return {
    products,
    yupooUrl,
  };
};

const createNewExcel = async ({ products, yupooUrl }) => {
  try {
    const filePath = path.resolve(
      __dirname,
      "../../../uploads",
      "document",
      "new",
      `new-document-${dateMadrid}.xlsx`
    );

    const workbook = await XlsxPopulate.fromBlankAsync();

    const sheet = workbook.sheet(0);

    products.forEach(({ code, url }, i) => {
      const row = i + 1;
      sheet.cell(`A${row}`).value(code);
      sheet.cell(`B${row}`).value(url);
    });
    sheet.cell("C1").value(yupooUrl);

    await workbook.toFileAsync(filePath);

    return filePath;
  } catch (error) {
    throw Error("Error al crear el archivo Excel");
  }
};

const getElementsExcel = ({ workBook }) => {
  const sheet = workBook.sheet(0);
  const codes = sheet.range("A1:A5").value().flat();

  const urls = sheet.range("B1:B5").value().flat();

  const yupoo = [sheet.cell("C1").value()];

  return {
    codes,
    urls,
    yupoo,
  };
};

const getOtherElementsExcel = ({ workBook }) => {
  const sheet = workBook.sheet(0);
  const lastCell = sheet.usedRange().endCell();

  console.log(lastCell.value());

  const lastRow = lastCell.rowNumber();

  const codes = sheet.range(`A5:A${lastRow}`).value().flat();
  const urls = sheet.range(`B5:B${lastRow}`).value().flat();
  const yupoo = [sheet.cell("C1").value()];

  return {
    codes,
    urls,
    yupoo,
    lastRow,
  };
};

const updateExcel = ({ workBook, lastRow, codes, urls, path }) => {
  const sheet = workBook.sheet(0);
  const cellsA = sheet.range(`A1:A${lastRow}`).value(null);
  const cellsB = sheet.range(`B1:B${lastRow}`).value(null);

  cellsA.forEach((cell, index) => {
    cell.value(codes[index]);
  });

  cellsB.forEach((cell, index) => {
    cell.value(urls[index]);
  });

  return workBook.toFileAsync(path);
};

module.exports = {
  readExcelFile,
  parseExcelFile,
  createNewExcel,
  getElementsExcel,
  getOtherElementsExcel,
  updateExcel,
};
