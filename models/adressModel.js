const { default: mongoose } = require("mongoose");

const addressModel = mongoose.Schema({
   city: { type: String, required: true },
   cityID: { type: String, required: true },
   district: { type: String, required: true },
   districtID: { type: String, required: true },
   ward: { type: String, required: true },
   wardID: { type: String, required: true },
   addressDetail: { type: String, required: true },
});
module.exports = addressModel;
