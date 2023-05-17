const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;


// let cart = null;
// module.exports = class Cart {
//   static save(product){
//   if(cart){ //cart is not null

//   } else {
//     cart = {products:[],totalPrice:0};
//     product.qty = 1
//     cart.products.push(product);
//     cart.totalPrice = product.price;
//     }
//   }
//   static getCart(){
//     return cart;
//   }
// }

