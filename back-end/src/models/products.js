const mongoose = require('mongoose')
const helper = require('./helper/productHelper')

const productSchema = new mongoose.Schema({
  productName: {
    en: helper.productNameObj,
    cn: helper.productNameObj,
    jpn: helper.productNameObj,
  },
  category: {
    en: helper.categoryObj,
    cn: helper.categoryObj,
    jpn: helper.categoryObj,
  },
  gender: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
      default: '/random_path',
    },
  ],
  feature: {
    en: helper.featureObj,
    cn: helper.featureObj,
    jpn: helper.featureObj,
  },
  description: {
    en: helper.descriptionObj,
    cn: helper.descriptionObj,
    jpn: helper.descriptionObj,
  },
  style: {
    en: helper.styleObject,
    cn: helper.styleObject,
    jpn: helper.styleObject,
  },
  color: [
    {
      en: helper.colorObject,
      cn: helper.colorObject,
      jpn: helper.colorObject,
    },
  ],
  price: {
    hkd: helper.priceObject,
    jpn: helper.priceObject,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  material: {
    type: String,
  },
  washing_care: {
    type: String,
  },
  discount: {
    type: String,
  },
  extra_small: {
    type: Number,
    default: 0,
  },
  small: {
    type: Number,
    default: 0,
  },
  medium: {
    type: Number,
    default: 0,
  },
  large: {
    type: Number,
    default: 0,
  },
  extra_large: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})

const Product = mongoose.model('products', productSchema)
module.exports = { productSchema, Product }
