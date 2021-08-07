const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  delivery_method: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  payment: {
    payment_type: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
  },
  billingAddress: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discounted: {
    type: String,
  },
})

const Order = mongoose.model('orders', orderSchema)
module.exports = { orderSchema, Order }
