const mongoose = require("mongoose");

const reviewModel = mongoose.Schema({
   name: { type: String, required: true },
   rating: { type: Number, required: true },
   comment: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const discountDetailModel = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
   start: { type: Date, required: true },
   end: { type: Date, required: true },
   discount: { type: Number, required: true },
});

const qtySoldDetailModel = mongoose.Schema({
   price: { type: Number, required: true },
   qty: { type: Number, required: true },
});

const imageDetailModel = mongoose.Schema({
   mainImg: { type: String, required: true },
   moreImg: { type: Array },
});

const categoryModel = mongoose.Schema({
   categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
   name: { type: String, required: true },
   type: { type: String, required: true },
   titleType: { type: String, require: true },
});

const isDeleteModel = mongoose.Schema({
   type: { type: Boolean, default: false },
   user: {
      type: mongoose.Schema.Types.ObjectId,

      default: null,
   },
   deleteDay: { type: Date, default: null },
});

const productModel = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
   name: { type: String, required: true },
   image: { type: Object(imageDetailModel), required: true },
   brand: { type: String, required: true },
   category: { type: [categoryModel] },
   desc: { type: String, required: true },
   reviews: { type: [reviewModel] },
   totalRating: { type: Number, required: true, default: 0 },
   qtyRating: { type: Number, required: true, default: 0 },
   price: { type: Number, required: true },
   discountDetail: { type: [discountDetailModel] },
   countInStock: { type: Number, required: true },
   qtySold: { type: [qtySoldDetailModel] },
   isDelete: {
      type: Object(isDeleteModel),
      default: { type: false, user: null, deleteDay: null },
   },
});

const Product = mongoose.model("Product", productModel);
module.exports = Product;
