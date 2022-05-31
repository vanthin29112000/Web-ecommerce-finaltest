const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      const connect = await mongoose.connect(
         "mongodb://localhost/final-exam-DB06"
      );
   } catch (error) {
      console.log("error", error);
   }
};

module.exports = connectDB;
