const connectDB = require("./config/db");
const brands = require("./data/brand");
const products = require("./data/products");
const users = require("./data/user");
const Brand = require("./models/brandModel");
const Product = require("./models/productModel");
const Users = require("./models/userModel");
const { hashing } = require("./utils/hasing");

connectDB();

// const importDataUsers = async () => {
//    try {
//       await Users.deleteMany();
//       users[0].password = await hashing(users[0].password);
//       await Users.insertMany(users);
//       console.log("data imported success !!");
//    } catch (error) {
//       console.log(error);
//    }
// };

const importDataProducts = async () => {
   try {
      console.log(products);
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log("import data products success");
   } catch (error) {
      console.log(error);
   }
};

// const importDataBrands = async () => {
//    try {
//       await Brand.deleteMany();
//       await Brand.insertMany(brands);
//       console.log("import data success");
//    } catch (error) {
//       console.log(error);
//    }
// };

// importDataUsers();
importDataProducts();
// importDataBrands();
