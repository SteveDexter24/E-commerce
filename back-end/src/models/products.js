const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    default: '/random_path',
  },
  feature: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  stock: {
    type: Number,
  },
  size: {
    small: {
      type: String,
      stock: {
        type: Number,
      },
    },
    medium: {
      type: String,
      stock: {
        type: Number,
      },
    },
    large: {
      type: String,
      stock: {
        type: Number,
      },
    },
    extra_large: {
      type: String,
      stock: {
        type: Number,
      },
    },
  },
})

const Product = mongoose.model('products', productSchema)
module.exports = { productSchema, Product }
