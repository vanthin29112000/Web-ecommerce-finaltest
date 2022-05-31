const mongoose = require("mongoose");
const categoryModel = mongoose.Schema({
   name: { type: String, required: true },
   type: { type: String, required: true },
   listItem: { type: Array, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, required: true },
   dayCreated: { type: Date, required: true },
});
const Category = mongoose.model("Category", categoryModel);
module.exports = Category;
