const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

    delivery_method: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    creditCardNum: {
        type: String,
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
});

const Order = mongoose.model("orders", orderSchema);
module.exports = { orderSchema, Order };
