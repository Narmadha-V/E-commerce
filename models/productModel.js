const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, "A produc must have a sku"],
    trim: true,
  },
  productName: {
    type: String,
    required: [true, "A product must have a productname"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
 description:{
  type: String,
  // required: [true, "A product must have a description"],
  trim: true
 },
 status: {
  type: String,
  enum: ["Active", "Inactive"],
  default: "Active",
  required: [true, "A product must have a status"],
},
 url: {
  type: String,
  required: true
}, 
// image:{
//   image: req.file.path
// },
 discount: {
  type: Number,
  default: 0
},
startDate: {
  type: Date,
  default: Date.now
},
endDate: {
  type: Date,
  default: Date.now
},
isAddToCart: { type: Boolean, default: false }, // new field

});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;





