const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
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
      required: true,
      default: 'member',
    },
    language: {
      type: String,
      required: true,
      default: 'en',
    },
    location: {
      type: Array,
    },
    address: {
      type: String,
      trim: true,
    },
    billingAddress: {
      type: String,
      trim: true,
    },
    creditCard: {
      cardNum: {
        type: String,
        trim: true,
      },
      cardName: {
        type: String,
        trim: true,
      },
    },
    cart: {
      type: Schema.Types.ObjectId,
    },
    orderHistory: {
      type: Schema.Types.ObjectId,
    },
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
