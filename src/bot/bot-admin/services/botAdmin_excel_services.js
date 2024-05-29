const XlsxPopulate = require("xlsx-populate");
const path = require("path");

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
    const date = new Date();
    const options = { timeZone: "Europe/Madrid", hour12: false };
    const dateString = date
      .toLocaleDateString("es-ES", options)
      .replace(/\//g, "-");
    const filePath = path.resolve(
      __dirname,
      "../../../uploads",
      "document",
      "newDocuments",
      `new-document-${dateString}.xlsx`
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

const getElementsExcel = ({ workBook, range }) => {
  const sheet = workBook.sheet(0);
  const data = sheet.range("C1:C5").values();
  console.log(data);
};

module.exports = {
  readExcelFile,
  parseExcelFile,
  createNewExcel,
  getElementsExcel,
};
