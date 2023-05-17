const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    type:String
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }, 
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
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  }, 
  isAddToCart: { type: Boolean, default: false },

});

module.exports = mongoose.model('CartItem', cartItemSchema);
