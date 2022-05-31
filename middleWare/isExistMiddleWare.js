const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const isExistProduct = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   let product;
   try {
      product = await Product.findById(id);
   } catch (error) {
      res.status("400");
      throw new Error("product not found!");
   }
   if (!product.isDelete.type) {
      req.product = product;
      next();
   } else {
      res.status("400");
      throw new Error("product id deleted !");
   }
});

const isExistUser = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   try {
      req.userExist = await User.findById(id);
      next();
   } catch (error) {
      res.status("400");
      throw new Error("User not found !");
   }
});

const isExistOrder = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   let order = "";
   try {
      order = await Order.findById(id);
   } catch (error) {
      res.status("400");
      throw new Error("Order not found !");
   }

   if (!order.isCancel.type) {
      req.order = order;
      next();
   } else {
      res.status("400");
      throw new Error("Order is canceled !");
   }
});

const isExistCategory = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   try {
      const category = await Category.findById(id);
      if (category) {
         req.category = category;
         next();
      } else {
         res.status("400");
         throw new Error("Category not found !");
      }
   } catch (error) {
      res.status("400");
      throw new Error("Category not found !");
   }
});

const isExistBrand = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   try {
      const brand = await Brand.findById(id);
      if (brand) {
         req.brand = brand;
         next();
      }
   } catch (error) {
      res.status("400");
      throw new Error("Brand not found !");
   }
});

module.exports = {
   isExistProduct,
   isExistUser,
   isExistOrder,
   isExistCategory,
   isExistBrand,
};
