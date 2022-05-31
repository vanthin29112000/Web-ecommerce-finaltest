const bcrypt = require("bcryptjs");

const hashing = async (key) => {
   const salt = await bcrypt.genSalt(10);
   const keyHash = await bcrypt.hash(key, salt);
   return keyHash;
};

const checkCompare = (key, keyHash) => {
   return bcrypt.compareSync(key, keyHash);
};

module.exports = { hashing, checkCompare };
