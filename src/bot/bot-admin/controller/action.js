const handleButtonAutomatic = (ctx) => {
  ctx.scene.enter("get_document_scene");
  ctx.answerCbQuery();
};

const handleButtonPublish = (ctx) => {
  ctx.scene.enter("publish_elements_scene");

  ctx.answerCbQuery();
};

module.exports = {
  handleButtonAutomatic,
  handleButtonPublish,
};
