const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { count } = require("../models/brandModel");
const Brand = require("../models/brandModel");
const Product = require("../models/productModel");

const getAllProducts = expressAsyncHandler(async (req, res) => {
   const keySearch = req.query.search
      ? { name: { $regex: req.query.search } }
      : {};
   const limit = req.query.pageCount;
   try {
      let product = "";
      if (limit) {
         product = await Product.find({ ...keySearch }).limit(limit);
      } else {
         product = await Product.find({ ...keySearch });
      }
      res.status("200").json({
         search: req.params.search,
         products: product,
         countItem: product.length,
      });
   } catch (error) {
      res.status("400");
      throw new Error("Get fail");
   }
});

const createProduct = expressAsyncHandler(async (req, res) => {
   const {
      name,
      mainImg,
      brand,
      desc,
      price,
      countInStock,
      moreImg,
      category,
      discountDetail,
   } = req.body;

   try {
      const product = new Product({
         user: req.user._id,
         name,
         image: { mainImg, moreImg },
         brand,
         category,
         desc,
         discountDetail,
         price,
         countInStock,
      });
      const newProduct = await product.save();
      res.status("200").json(newProduct);
   } catch (error) {
      res.status("400");
      throw new Error("Create fail");
   }
});

const createReviewProduct = expressAsyncHandler(async (req, res) => {
   const { _id, name } = req.user;
   const { rating, comment } = req.body;
   const productExist = req.product;

   if (productExist.reviews.length > 0) {
      const isReview = productExist.reviews.find(
         (review) => review.user.toString() === _id.toString()
      );
      if (isReview) {
         res.status("400");
         throw new Error("you already review for this product !!!");
      }
   }

   const review = {
      user: _id,
      name: name,
      rating,
      comment,
   };

   productExist.reviews.push(review);
   productExist.totalRating += rating;
   productExist.qtyRating += 1;

   try {
      await productExist.save();
      res.status("200").json({ message: "review success" });
   } catch (error) {
      res.status("400");
      throw new Error("Review fail");
   }
});

const updateProduct = async (req, res) => {
   const {
      name,
      mainImg,
      moreImg,
      brand,
      category,
      desc,
      discountDetail,
      price,
      countInStock,
   } = req.body;

   const product = req.product;

   product.name = name || product.name;
   product.image.mainImg = mainImg || product.image.mainImg;
   product.image.moreImg = moreImg || product.image.moreImg;
   product.brand = brand || product.brand;
   product.category = category || product.category;
   product.desc = desc || product.desc;
   product.discountDetail = discountDetail || product.discountDetail;
   product.price = price || product.price;
   product.countInStock = countInStock || product.countInStock;

   try {
      const newProduct = await product.save();
      res.status("200").json(newProduct);
   } catch (error) {
      res.status("400");
      throw new Error("update product fail", error);
   }
};

const getProductByID = expressAsyncHandler(async (req, res) => {
   const product = req.product;
   res.status("200").json(product);
});

const deletedProductByID = expressAsyncHandler(async (req, res) => {
   const product = req.product;

   product.isDelete.type = true;
   product.isDelete.user = req.user._id;
   product.isDelete.deleteDay = new Date();

   try {
      await product.save();
      res.status("200").json({ message: "delete product success" });
   } catch (error) {
      res.status("400");
      throw new Error("Delete product fail");
   }
});

const getProductTopReview = expressAsyncHandler(async (req, res) => {
   const countPage = req.query.countPage || 5;

   try {
      const product = await Product.find();
      product.sort((a, b) => {
         return b.qtyRating - a.qtyRating;
      });

      res.status("200").json(product.slice(0, countPage));
   } catch (error) {
      res.status("400");
      throw new Error("Get fail !!");
   }
});

const getProductTopSoldOut = expressAsyncHandler(async (req, res) => {
   const countPage = req.query.countPage || 5;
   try {
      const product = await Product.find();

      let temp = product.map((ele) => {
         let sum = 0;
         ele.qtySold.forEach((item) => {
            sum += item.qty;
         });
         ele["totalQtySold"] = sum;
         return ele;
      });

      temp.sort((a, b) => {
         return b.totalQtySold - a.totalQtySold;
      });

      res.status("200").json(temp.slice(0, countPage));
   } catch (error) {
      res.status("400");
      throw new Error("Get fail !!");
   }
});

module.exports = {
   getAllProducts,
   createProduct,
   createReviewProduct,
   updateProduct,
   getProductByID,
   deletedProductByID,
   getProductTopReview,
   getProductTopSoldOut,
};
