const { handleError } = require("../../../utils/error_handle");
const { getInfoUser } = require("../../../utils/getInfoUser");

const {
  menuMessage,
  questionsMessage,
  welcomeMessage,
  infoMessage,
} = require("../utils/responses_es"); // messages

const {
  menuKeyBoard,
  questionsKeyBoard,
  questionsOthersKeyBoard,
  questionsKeyBoardReturn,
  infoKeyBoard,
} = require("../Views/keyboard"); //KeysBoard

const handleStart = (ctx) => {
  /**  /start */

  try {
    const { username } = getInfoUser(ctx);
    ctx.replyWithMarkdown(welcomeMessage.startMessage(username));
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonQuestions = (ctx) => {
  /** Button Preguntas Frecuentes */
  try {
    ctx.replyWithMarkdown(questionsMessage.message, questionsKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleButtonInfo = (ctx) => {
  /** Button Informacion Valiosa */

  try {
    ctx.replyWithMarkdown(infoMessage.message, infoKeyBoard);
  } catch (error) {
    handleError(ctx, error);
  }
};

const handleMenu = (ctx) => {
  /**  /menu */
  ctx.replyWithMarkdown(menuMessage.messageDos, menuKeyBoard);
};

const handleButtonCallBack = async (ctx) => {
  const callBackName = ctx.callbackQuery.data;

  ctx.answerCbQuery();

  switch (callBackName) {
    case "option0":
      ctx.replyWithMarkdown(
        `Somos una tienda dedicada a la venta de productos 🏴‍☠️.\n\nNos encargamos de encontrar proveedores específicos y de confianza, además de mantener la calidad ⭐⭐⭐⭐⭐.\n\nNo encontrarás la diferencia.`
      );

      break;

    case "option1":
      ctx.replyWithMarkdown(
        `Cualquier persona que tenga acceso a Internet 🌐 \ny la aplicación ALIEXPRESS puede comprar fácilmente. \n\nAdemás, *RECUERDA ENVIAR EL COMPROBANTE DE PAGO* 📄 \n\nY PONER EL CÓDIGO: *[CODIGO]*`
      );

      break;
    case "option2":
      ctx.replyWithMarkdown(
        `Como este mundo es de piratas amigables y económicos, tu pedido puede demorar aproximadamente [demora aproximada] ⏳.\n\nNo te preocupes, tu pedido llegará sin un rasguño y tal como lo pediste.`
      );

      break;

    case "option3":
      ctx.replyWithMarkdown(
        `1⃣ Pincha en el enlace. Es un enlace OCULTO, te llevará a otro producto diferente, no te preocupes, sigue las instrucciones.\n\n2⃣ Selecciona el modelo según el CÓDIGO DE LAS IMÁGENES (presta atención a las miniaturas o códigos de las fotos de Telegram para saber qué hay que seleccionar en el enlace de compra).\n\n3⃣ Elige el modelo y talla en las descripciones.\n\n4⃣ En notas del artículo, deja el código (Código) y las especificaciones de color o talla.\n\n5⃣ Por último, completa todos los datos y paga ahora. Tu pedido llegará tal cual lo pediste y a la dirección seleccionada.`
      );

      break;

    case "option4":
      //otras preguntas
      otherQuestions = true;
      await ctx.editMessageReplyMarkup({
        inline_keyboard: questionsOthersKeyBoard,
      });

      break;

    case "option5":
      ctx.replyWithMarkdown(
        `Todos los que permita la plataforma de Aliexpress 💳.`
      );

      break;

    case "option6":
      ctx.replyWithMarkdown(
        `Es recomendable hacer pedidos específicos. En resumen, haz un pedido a pedido para evitar errores en tu compra. 📦`
      );

      break;

    case "option7":
      ctx.replyWithMarkdown(
        `Las características se encuentran en las imágenes del GRUPO DE VENTAS, el precio de los productos es el de ALIEXPRESS. 🛒`
      );

      break;

    case "option8":
      ctx.replyWithMarkdown(`Estamos chequeando esa opción... 🕵️‍♂️`);
      break;

    case "option9":
      ctx.replyWithMarkdown(
        `Los enlaces en general se renuevan por razones obvias. Estate atento para no perder la oportunidad de comprar productos al mejor precio. 💰`
      );

      break;

    case "option10":
      ctx.replyWithMarkdown(
        await ctx.editMessageReplyMarkup({
          inline_keyboard: questionsKeyBoardReturn,
        })
      );
  }
};

module.exports = {
  handleStart,
  handleMenu,
  handleButtonInfo,
  handleButtonQuestions,
  handleButtonCallBack,
};
