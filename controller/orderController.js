const expressAsyncHandler = require("express-async-handler");
const { rethrow } = require("jade/lib/runtime");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const createNewOrder = expressAsyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentResult,
      paymentMethod,
      shippingPrice,
      totalPrice,
      phoneNumber,
   } = req.body;

   if (orderItems.length > 0) {
      let flag = true;
      let dataError = [];
      for (let ele of orderItems) {
         const product = await Product.findById(ele.product);
         if (product.countInStock < ele.qty) {
            dataError.push(ele.product);
            flag = false;
         }
      }
      if (flag) {
         const newOrder = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            paymentResult,
            totalPrice,
            phoneNumber,
            user: req.user._id,
            dayCreated: new Date(),
         });

         try {
            await newOrder.save();

            const user = await User.findByIdAndUpdate(req.user._id, {
               $set: { shoppingCart: [] },
            });

            // update countInStock
            orderItems.forEach(async (ele) => {
               const product = await Product.findById(ele.product);
               product.countInStock -= ele.qty;
               await product.save();
            });

            res.status("200").json(user.shoppingCart);
         } catch (error) {
            res.status("400");
            throw new Error("Create order fail");
         }
      } else {
         res.status("400").json({ type: "ERROR", dataError: dataError });
      }
   } else {
      res.status("400");
      throw new Error("No products!!");
   }
});

const updateOrder = expressAsyncHandler(async (req, res) => {
   const user = req.user;
   const { shippingAddress, phoneNumber } = req.body;
   const order = req.order;

   if (
      user._id.toString() === order.user.toString() ||
      user.position === 1 ||
      user.position === 2
   ) {
      order.shippingAddress = shippingAddress || order.shippingAddress;
      order.phoneNumber = phoneNumber || order.phoneNumber;

      try {
         await order.save();
         res.status("200").json({ message: "update success !!" });
      } catch (error) {
         res.status("400");
         throw new Error("update order fail");
      }
   } else {
      res.status("400");
      throw new Error("You cannot perform this action");
   }
});

const cancelOrder = expressAsyncHandler(async (req, res) => {
   const { reason } = req.body;
   const order = req.order;
   const user = req.user;

   if (
      (user._id.toString() === order.user.toString() &&
         order.statusOrder === 0) ||
      ((user.position === 1 || user.position === 2) &&
         (order.statusOrder === 0 || order.statusOrder === 1))
   ) {
      order.statusOrder = 5;
      order.isCancel = {
         type: true,
         dayCancel: new Date(),
         reason,
         user: user._id,
      };

      try {
         await order.save();
         res.status("200").json({ message: "Cancel order success" });
      } catch (error) {
         res.status("400");
         throw new Error("Cancel Order fail");
      }
   } else {
      res.status("400");
      throw new Error("You cannot perform this action");
   }
});

const getAllOrder = expressAsyncHandler(async (req, res) => {
   const user = req.user;
   const condition = user.position === 0 ? { user: user._id } : {};

   try {
      const listOrder = await Order.find(condition);
      res.status("200").json(listOrder);
   } catch (error) {
      res.status("400");
      throw new Error("get all product fail ");
   }
});

const getOrderByID = expressAsyncHandler(async (req, res) => {
   const order = req.order;
   const user = req.user;

   if (user.position === 1 || user.position === 2) {
      res.status("200").json(order);
   }

   if (order.user.toString() === user._id.toString()) {
      res.status("200").json(order);
   } else {
      res.status("400");
      throw new Error("You cannot perform this action");
   }
});

const updateStatusOrder = expressAsyncHandler(async (req, res) => {
   const order = req.order;
   const user = req.user;
   const { status } = req.body;
   let flag = true;

   if (order.statusOrder === 0 && status === 1) {
      order.isAccept = {
         dayAccept: new Date(),
         user: user._id,
      };
      order.statusOrder = 1;
      flag = false;
   }

   if (order.statusOrder === 1 && status === 2) {
      order.statusOrder = 2;
      flag = false;
   }

   if (order.statusOrder === 2 && (status === 3 || status === 4)) {
      order.statusOrder = status;
      if (status === 3) {
         order.orderItems.forEach(async (ele) => {
            let product = await Product.findById(ele.product);

            const index = product.qtySold.findIndex((item) => {
               item.price === ele.price;
            });

            if (index != -1) {
               product.qtySold[index].qty += ele.qty;
            } else {
               product.qtySold.push({ price: ele.price, qty: ele.qty });
            }

            await product.save();
         });
      }
      flag = false;
   }

   if (!flag) {
      try {
         await order.save();
         res.status("200").json({ message: "update order status success" });
      } catch (error) {
         res.status("400");
         throw new Error("update fail");
      }
   } else {
      res.status("400");
      throw new Error("You cannot perform this action");
   }
});

module.exports = {
   createNewOrder,
   updateOrder,
   cancelOrder,
   getAllOrder,
   getOrderByID,
   updateStatusOrder,
};
