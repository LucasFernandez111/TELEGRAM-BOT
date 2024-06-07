const { blockedUsers } = require("../../../utils/shared");

const checkBlockedUser = (ctx, next) => {
  const { from } = ctx;
  const isBlocked = blockedUsers.has(from.id);

  if (isBlocked)
    return ctx.reply(
      "🚫 No tienes acceso al bot. Tu usuario ha sido bloqueado por incumplimiento de reglas."
    );

  next();
};

module.exports = { checkBlockedUser };
