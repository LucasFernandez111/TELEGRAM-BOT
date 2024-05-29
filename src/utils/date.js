const date = new Date();
const options = { timeZone: "Europe/Madrid", hour12: false };

exports.dateMadrid = date
  .toLocaleDateString("es-ES", options)
  .replace(/\//g, "-");
