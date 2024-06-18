const messageEs = {
  welcomeMessage: {
    startMessage: (username) =>
      `Hola! *${username}* 😊 Soy Joselu el BOT personal del Grupo *CholloPro2.0*.\nEstoy aquí para ayudarte.\n\nSi necesitas algo, no dudes en preguntarme. 🤖 (/menu)`,
  },

  menuMessage: {
    messageDos: `\n📘 Para obtener un tutorial detallado sobre cómo comprar, selecciona el BOTÓN "TUTORIAL DE COMPRA".\n\n📄 Para enviar el NÚMERO DE PEDIDO de compra (OBLIGATORIO), utiliza el BOTÓN "ASISTENTE Y NÚMERO DE COMPRA".\n\nℹ️ Antes de realizar tu compra, asegúrate de revisar la información importante con el BOTÓN\n"INFORMACIÓN VALIOSA".\n\n❓🤔 Si tienes alguna pregunta o necesitas ayuda ESPECÍFICA PARA QUE EL EQUIPO te responda, no dudes en utilizar el BOTÓN "ASISTENTE Y NÚMERO DE COMPRA".\n\n*Recuerda enviarme el NÚMERO DE PEDIDO DE COMPRA 📸 junto con el código Chollazo2.0 para asegurarnos de que el pedido se realice correctameante y tengamos un seguimiento adecuado del mismo* 📦✅.\n\n¡Estoy aquí para ayudarte en cada paso del proceso de compra! 💪😃🛒`,
    keyBoard: {
      text_tutorial: "📘 TUTORIAL DE COMPRA  ",

      text_questions: "❓🤔PREGUNTAS FRECUENTES ",
      text_info: "ℹ️ INFORMACIÓN VALIOSA ",
      text_custom: " 💬ASISTENTE Y NÚMERO DE COMPRA",
    },
  },
  questionsMessage: {
    message: "ㅤㅤ*PREGUNTAS FRECUENTES*ㅤㅤ",
    keyBoard: {
      text_options: [
        "¿Qué es Chollazo2.0? 🤔",
        "¿Quiénes pueden comprar aquí? 🛍️",
        "¿Cuándo recibiré mi pedido? ⏰📦",
        "¿Cómo comienzo a comprar? 🛒",
        "ㅤㅤOtras preguntas...ㅤㅤ",
        "¿Qué métodos de pago puedo usar?",
        "¿Puedo comprar de distintas categorías?",
        "¿Cómo veo las características?",
        "¿Cuáles son las políticas de devolución?",
        "¿Qué sucede si un producto se agota?",
        "ㅤㅤ« Regresarㅤㅤ",
      ],
    },
  },

  infoMessage: {
    message: "ㅤㅤㅤ*INFORMACION VALIOSA*",
    keyboard: {
      text_options: [
        "ㅤ🔍 ENLACES CON MÁS DE UNA SEMANA",
        "ㅤ🔎 BUSCADOR EN TELEGRAM",
        "ㅤ🌐 ABRIR ENLACES EN LA APP DE ALIEXPRESS",
        "ㅤ🐞 BUG/ERROR EN LA APP DE ALIEXPRESS",
        "ㅤ📦 PEDIDOS NO ENVIADOS DE ALIEXPRESS",
        "ㅤ💳 COMPRA SEGURA",
        "ㅤ🚫 PEDIDO CANCELADO",
      ],
      text_response: [
        `Si al abrir el enlace no coincide el precio, la selección de modelos o notas algo extraño, pregúntame antes de comprar, ya que puede que hayan cambiado.\n\nSi compras, NO estarás cubierto ni por mí ni por el vendedor.`,

        `En el canal, si pulsas arriba en los 3 puntitos y das a buscar, puedes buscar por palabra, así podrás ver solo las publicaciones que lleven esa palabra.`,

        `Para los que tienen Android, entra en la app de Telegram, pulsa arriba en los 3 puntitos y ve a ajustes, baja abajo y DESACTIVA el navegador interno.`,

        `Hay compradores que al recibir sus pedidos reciben algo de distinta talla o modelo y al comprobarlo la sorpresa es que tu pedido ha cambiado!!!\n\nPERO NO, se trata de un bug/error de la app de AliExpress, por ello RECOMENDAMOS que justo antes de pagar, puedes ver el resumen del pedido y comprobarlo.\n\nSi cambia, la solución temporal es realizar el pedido desde un PC y SIEMPRE UTILIZA LA PALABRA CLAVE *“Chollazo2.0”*.`,

        `Si el vendedor sospecha que no eres un buen comprador, es posible que no te envíen pedidos.\n\nDisponen de una lista negra en la que los vendedores incluyen a los malos compradores.\n\nNo siempre es justo, pero es una forma de ahorrarse problemas.`,

        `Obviamente, la seguridad del pago y envío está 100% asegurada sin problemas gracias a la plataforma AliExpress.`,

        `En caso de que en el seguimiento de AliExpress aparezca PEDIDO CANCELADO, debes abrir disputa adjuntando captura del seguimiento y te reembolsarán el dinero.\n\nLos motivos mayormente son porque rechazan los pedidos en las mensajerías.`,
      ],
    },
  },
};

module.exports = messageEs;
