const express = require("express");
const {
   createNewOrder,
   updateOrder,
   cancelOrder,
   getAllOrder,
   getOrderByID,
   updateStatusOrder,
} = require("../controller/orderController");
const {
   protect,
   isCustomer,
   isStaffOrAdmin,
} = require("../middleWare/authMiddleWare");
const { isExistOrder } = require("../middleWare/isExistMiddleWare");
const router = express.Router();

// Create new order
router.post("/", protect, isCustomer, createNewOrder);

// update order by ID
router.put("/:id", protect, isExistOrder, updateOrder);

// cancel order by ID
router.delete("/:id", protect, isExistOrder, cancelOrder);

// Get all order
router.get("/all", protect, getAllOrder);

// Get order by ID
router.get("/:id", protect, isExistOrder, getOrderByID);

// Update status order
router.put(
   "/:id/status",
   protect,
   isStaffOrAdmin,
   isExistOrder,
   updateStatusOrder
);
module.exports = router;
