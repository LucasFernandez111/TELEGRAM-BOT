const path = require("path");

const date = new Date();
const options = { timeZone: "Europe/Madrid", hour12: false };

module.exports = {
  dateMadrid: date.toLocaleDateString("es-ES", options).replace(/\//g, "-"),

  srcBasePath: path.resolve(__dirname, "../../src"),
  uploadsBasePath: path.resolve(__dirname, "../uploads"),
};
