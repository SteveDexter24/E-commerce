const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    memberShip: {
      type: String,
      default: 'member',
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: 'en',
    },
    location: {
      type: Array,
    },
    address1: {
      type: String,
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    billingAddress: {
      type: String,
      trim: true,
    },
    contactNum: {
      type: String,
      trim: true,
    },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId },
        name: { type: String },
        description: { type: String },
        image: [{ type: String }],
        price: { type: String },
        size: { type: String },
        qty: { type: Number },
        color: { type: String },
        totalSize: { type: Number },
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orders',
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('users', userSchema)
module.exports = { userSchema, User }
