let products = [];
const fs = require("fs");
const path = require("path");
const Brand = require("../models/brandModel");
const User = require("../models/userModel");
const dir =
   "C:/Users/Admin/Desktop/D06-finalExam/backend/public/images/Products";
const files = fs.readdirSync(dir);
const renderProduct = async () => {
   let listImage = [];
   for (const file of files) {
      listImage.push(path.join(dir, file));
   }

   const brands = await Brand.find();

   for (let i = 0; i < listImage.length; i++) {
      const j = i + 1;
      tempProduct = {
         user: "6291ad57fc59905bf176df68",
         name: "sản phẩm " + j,
         image: { mainImg: listImage[i], moreImg: [] },
         brand: brands[Math.floor(Math.random() * brands.length)]._id,
         category: [],
         desc: "content",
         reviews: [],
         totalRating: 0,
         qtyRating: 0,
         discountDetail: [],
         price: (Math.floor(Math.random() * 10) + 1) * 1000000,
         countInStock: Math.floor(Math.random() * 100),
         qtySold: [],
      };

      products.push(tempProduct);
   }
};

renderProduct();

module.exports = products;
