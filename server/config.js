require("dotenv").config();

module.exports = {
  JWT: {
    secret: process.env.JWT_KEY,
    options: {
      algorithm: "HS256",
      expiresIn: "1h",
    },
  },
};