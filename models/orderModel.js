const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  date: {
    type: Date,
  },
 price: {
    type: String,
  },
quantity: {
    type: Number,
  },
  discountAmount: {
    type: Number,
  },
  shippingAddress: {
    type: String,
  },
  
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: true,
  },
  deliveredAt: {
    type: Date,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

orderSchema.virtual('orderDate').get(function() {
  return this.startDate.toISOString().substring(0, 10);
});

// orderSchema.virtual('endDateFormatted').get(function() {
//   return this.endDate.toISOString().substring(0, 10);
// });




