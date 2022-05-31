const express = require("express");
const {
   createNewCategory,
   updateCategory,
   getALlCategory,
   getCategoryByID,
} = require("../controller/categoryController");
const { protect, isStaffOrAdmin } = require("../middleWare/authMiddleWare");
const { isExistCategory } = require("../middleWare/isExistMiddleWare");
const router = express.Router();

// Create new category
router.post("/", protect, isStaffOrAdmin, createNewCategory);

// update category
router.put("/:id", protect, isStaffOrAdmin, isExistCategory, updateCategory);

// Get all category
router.get("/all", getALlCategory);

// Get category by ID
router.get("/:id", isExistCategory, getCategoryByID);
module.exports = router;
