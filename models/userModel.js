const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { hashing } = require("../utils/hasing");
const Address = require("./adressModel");

const productIncartSchema = mongoose.Schema({
   product: { type: mongoose.Schema.Types.ObjectId, required: true },
   qty: { type: Number, required: true },
});

const blocking = mongoose.Schema({
   type: { type: Boolean, required: true },
   user: { type: mongoose.Schema.Types.ObjectId },
   blockDay: { type: Date },
});

const userSchema = mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   gender: { type: Number, required: true },
   birthday: { type: Date, required: true },
   phoneNumber: { type: String, required: true },
   shoppingCart: { type: [productIncartSchema] },
   address: { type: Object(Address), required: true },
   position: { type: Number, require: true, default: 0 },
   isBlocking: {
      type: Object(blocking),
      require: true,
      default: { type: false, user: null, blockDay: null },
   },
});

// userSchema.pre("save", async function () {
//    const salt = await bcryptjs.genSalt(10);
//    this.password = await bcryptjs.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
