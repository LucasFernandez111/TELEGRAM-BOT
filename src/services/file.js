const axios = require("axios");

const getImageUrl = async (url) => {
  const image = await axios.get(url, { responseType: "arraybuffer" });

  return image;
};

module.exports = { getImageUrl };
