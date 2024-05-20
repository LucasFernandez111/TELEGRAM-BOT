exports.getInfoUser = (ctx) => {
  const user = ctx.message.from;

  return user;
};
