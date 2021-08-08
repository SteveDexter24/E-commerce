const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image: [
        {
            type: String,
            required: true,
            default: "/random_path",
        },
    ],
    feature: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    color: [
        {
            type: String,
        },
    ],
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
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
});

const Product = mongoose.model("products", productSchema);
module.exports = { productSchema, Product };
