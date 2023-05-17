const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },
  address: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true,
    match: /^\d{6}$/
  }
});

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
module.exports =  ShippingAddress ;
