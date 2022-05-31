let brands = [];
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const dir = "C:/Users/Admin/Desktop/D06-finalExam/backend/public/images/Brands";
const files = fs.readdirSync(dir);
const renderBrands = async () => {
   let listImage = [];
   for (const file of files) {
      listImage.push(path.join(dir, file));
   }
   const user = await User.find();

   for (let i = 0; i < listImage.length; i++) {
      const j = i + 1;
      tempBrands = {
         user: user[0]._id,
         name: "brand" + j,
         logo: listImage[i],
         desc: "content",
      };
      brands.push(tempBrands);
   }
};
renderBrands();
module.exports = brands;
