const express = require("express");
const {
   createNewBrand,
   updateBrandByID,
   getALlBrand,
   getBrandByID,
} = require("../controller/brandController");
const { protect, isStaffOrAdmin } = require("../middleWare/authMiddleWare");
const { isExistBrand } = require("../middleWare/isExistMiddleWare");
const router = express.Router();

// Create new brand
router.post("/", protect, isStaffOrAdmin, createNewBrand);

// Update brand by ID
router.put("/:id", protect, isStaffOrAdmin, isExistBrand, updateBrandByID);

//  Get all brand
router.get("/all", getALlBrand);

// Get brand by ID
router.get("/:id", isExistBrand, getBrandByID);

module.exports = router;
