const JWT = require("jsonwebtoken");

const generateToken = (id) => {
   return JWT.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

module.exports = generateToken;
