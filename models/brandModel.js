const mongoose = require("mongoose");
const brandModel = mongoose.Schema({
   name: { type: String, required: true },
   desc: { type: String, required: true },
   logo: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
   dayCreated: { type: Date, required: true },
});

const Brand = mongoose.model("Brand", brandModel);
module.exports = Brand;
