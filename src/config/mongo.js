const { connect } = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  await connect(DB_URI);
};

module.exports = {
  dbConnect,
};
