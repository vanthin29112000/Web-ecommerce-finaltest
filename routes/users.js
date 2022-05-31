var express = require("express");
const {
   registerUser,
   loginUser,
   getProfilesUser,
   updateProfileUser,
   getAllUser,
   blockUser,
   getUserByID,
   updateUserByID,
   unblockUser,
   updateProductIncart,
   removeProductIncart,
} = require("../controller/userController");
const {
   protect,
   isAdmin,
   notAccountCurrent,
   isCustomer,
} = require("../middleWare/authMiddleWare");
const {
   isExistProduct,
   isExistUser,
} = require("../middleWare/isExistMiddleWare");
var router = express.Router();

// Register user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

// get profile user
router.get("/profile", protect, getProfilesUser);

// Update profile user
router.put("/profile", protect, updateProfileUser);

// get all user
router.get("/all", protect, isAdmin, getAllUser);

// Block user by ID
router.put(
   "/:id/block",
   protect,
   notAccountCurrent,
   isAdmin,
   isExistUser,
   blockUser
);

// unblock user by ID
router.put("/:id/unblock", protect, notAccountCurrent, isAdmin, unblockUser);

// get user by ID
router.get("/:id", protect, isAdmin, getUserByID);

// update user by ID
router.put("/:id", protect, notAccountCurrent, isAdmin, updateUserByID);

// update product incart
router.put(
   "/:id/updateincart",
   protect,
   isCustomer,
   isExistProduct,
   updateProductIncart
);

// remove product incart
router.delete(
   "/:id/removeincart",
   protect,
   isCustomer,
   isExistProduct,
   removeProductIncart
);
module.exports = router;
