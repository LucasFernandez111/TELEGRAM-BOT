const XlsxPopulate = require("xlsx-populate");
const path = require("path");
const { dateMadrid } = require("../../../utils/config");

const readExcelFile = async (filePath) => {
  const workBook = await XlsxPopulate.fromFileAsync(filePath);

  if (!workBook) throw Error("Problemas al leer el archivo Excel");

  return workBook;
};

const getSheetData = (workBook) => {
  const sheetNames = workBook.sheets().map((sheet) => sheet.name());

  if (sheetNames.length == 0) throw Error("No existe ninguna sheet...");

  const sheetsData = sheetNames
    .map((sheetName) => {
      const sheet = workBook.sheet(sheetName);

      const range = sheet.usedRange();

      if (!range) throw Error(`No hay ningun dato en la sheet: ${sheetName}`);
      const lastCell = range.endCell();

      const lastRow = lastCell.rowNumber();

      const codes = sheet
        .range(`A2:A${lastRow}`)
        .value()
        .flat()
        .filter((code) => code != undefined);
      const urls = sheet
        .range(`B2:B${lastRow}`)
        .value()
        .flat()
        .filter((code) => code != undefined);

      if (codes.length != urls.length)
        throw Error(
          `El numero de codigos no coicide con los link de la sheet : ${sheetName}`
        );

      return {
        codes,
        urls,
      };
    })
    .flat();

  return sheetsData;
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

  const lastRow = lastCell.rowNumber();

  const codes = sheet.range(`A6:A${lastRow}`).value().flat();
  const urls = sheet.range(`B6:B${lastRow}`).value().flat();
  const yupoo = [sheet.cell("C1").value()];

  return {
    codes,
    urls,
    yupoo,
    lastRow,
  };
};

const getLinkYupoo = (workBook) => {
  const firstSheet = workBook.sheet(0);
  const linkYupoo = firstSheet.cell("C1").value();

  if (!linkYupoo) throw Error('No hay datos en la celda "C1"...');

  if (typeof linkYupoo == "object")
    throw Error('La celda "C1" tiene un formato no valido..');

  if (!linkYupoo.includes("yupoo.com"))
    throw Error('No es una URL de yupoo en "C1"!');

  return linkYupoo;
};

const createNewExcel = async ({ products, linkYupoo, pathFile }) => {
  const newWorkbook = await XlsxPopulate.fromBlankAsync();
  const sheet = newWorkbook.sheet(0);
  sheet.cell("C1").value(linkYupoo);

  products.forEach(({ codes, urls }) => {
    codes.forEach((code, index) => sheet.cell(`A${index + 1}`).value(code));

    urls.forEach((url, index) => sheet.cell(`B${index + 1}`).value(url));
  });

  await newWorkbook.toFileAsync(pathFile);

  return pathFile;
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
  getSheetData,
  createNewExcel,
  getElementsExcel,
  getOtherElementsExcel,
  updateExcel,
  getLinkYupoo,
};
