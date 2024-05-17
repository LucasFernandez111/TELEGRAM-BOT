const { Telegraf, Scenes, session } = require("telegraf");

const stage = new Scenes.Stage([productDataWizard]);
botAdmin.use(session());

botAdmin.use(stage.middleware());

botAdmin.action("manual", (ctx) => {
  ctx.scene.enter("PRODUCT_DATA_WIZARD");
});
