const mongoose = require("mongoose");
const addressModel = require("./adressModel");

const productModel = mongoose.Schema({
   product: { type: mongoose.Schema.Types.ObjectId, required: true },
   name: { type: String, required: true },
   qty: { type: Number, required: true },
   image: { type: String, required: true },
   price: { type: Number, required: true },
});

const paymentResultModel = mongoose.Schema({
   status: { type: Number, required: true },
   update_time: { type: Date },
});

const isCancelModel = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId },
   type: { type: Boolean },
   dayCancel: { type: Date },
   reason: { type: String },
});

const isAcceptModel = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId },
   type: { type: Boolean },
   dayAccept: { type: Date },
});

const orderModel = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
   dayCreated: { type: Date },
   orderItems: { type: [productModel] },
   shippingAddress: { type: Object(addressModel), required: true },
   phoneNumber: { type: String, required: true },
   paymentResultModel: {
      type: Object(paymentResultModel),
      default: { status: 0, update_time: null },
   },
   paymentMethod: { type: Number, required: true, default: 0 },
   shippingPrice: { type: Number, required: true },
   totalPrice: { type: Number, required: true },
   statusOrder: { type: Number, required: true, default: 0 },
   isCancel: {
      type: Object(isCancelModel),
      default: { type: false, dayCancel: null, reason: "" },
   },
   isAccept: {
      type: Object(isAcceptModel),
      default: { type: false, dayAccept: null, user: null },
   },
});

const Order = mongoose.model("Order", orderModel);
module.exports = Order;
