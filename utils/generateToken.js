const JWT = require("jsonwebtoken");

const generateToken = (id) => {
   return JWT.sign({ id }, "masobimat", { expiresIn: "1d" });
};

module.exports = generateToken;
