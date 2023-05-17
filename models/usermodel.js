const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please tell us your mail!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Pleaseprovide a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    // minlength:8,
    // select: false,
  },
  role: {
    type: String,
    enum: ['user',  'admin'],
    default: 'user'
  },
  // cart:{
  //     items:[{
  //         productId:{
  //           type:mongoose.Types.ObjectId,
  //           ref:'Product',
  //           required: true
  //         },
  //         qty:{
  //           type:Number,
  //           required:true
  //         }
  //     }],
  //     totalPrice:Number
  // }
});
// userSchema.methods.addToCart = function(product){
//   let cart = this.cart;
//   if(cart.items.length == 0){
//       cart.items.push({productId:product._id, qty: 1});
//       cart.totalPrice= product.price
//   }else{

//   }
//   console.log('user in schema', this.user)
// }
const User = mongoose.model("User", userSchema);
module.exports = User;
