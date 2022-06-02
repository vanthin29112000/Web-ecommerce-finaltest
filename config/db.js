const mongoose = require("mongoose");
const connectDB = async () => {
   try {
      const connect = await mongoose.connect(process.env.DATABASE_URL);
   } catch (error) {
      console.log("error", error);
   }
};

module.exports = connectDB;
