const resBot = {
  startRes: "Hola usuario ",
  sendProductRes:
    `¡Nuevo producto disponible!\n\n` +
    `*${title}*\n\n` +
    `${textAdmin}\n\n` +
    `${description}\n` +
    `Precio: *$${price.toFixed(2)}*\n\n` +
    `Palabra clave: *${key}*\n\n` +
    `[¡Compra ahora!]`,
};

module.exports = {
  resBot,
};
