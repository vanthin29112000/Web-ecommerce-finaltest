const express = require("express");
const {
   getAllProducts,
   createProduct,
   createReviewProduct,
   updateProduct,
   getProductByID,
   deletedProductByID,
   getProductTopReview,
   getProductTopSoldOut,
} = require("../controller/productController");
const {
   protect,
   isAdmin,
   isCustomer,
   isStaffOrAdmin,
} = require("../middleWare/authMiddleWare");
const { isExistProduct } = require("../middleWare/isExistMiddleWare");
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", protect, isStaffOrAdmin, createProduct);

router.post(
   "/:id/review",
   protect,
   isCustomer,
   isExistProduct,
   createReviewProduct
);

router.put("/:id", protect, isStaffOrAdmin, isExistProduct, updateProduct);

router.get("/:id", isExistProduct, getProductByID);

router.delete(
   "/:id",
   protect,
   isStaffOrAdmin,
   isExistProduct,
   deletedProductByID
);

router.get("/top/review", getProductTopReview);

router.get("/top/soldout", getProductTopSoldOut);

module.exports = router;
