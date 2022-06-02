const JWT = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (id) => {
   return JWT.sign({ id }, process.env.secretKey, { expiresIn: "1d" });
};

module.exports = generateToken;
