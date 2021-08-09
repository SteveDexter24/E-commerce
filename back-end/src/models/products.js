const mongoose = require("mongoose");
const helper = require("./helper/productHelper");

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
    image: [
        {
            type: String,
            required: true,
            default: "/random_path",
        },
    ],
    feature: {
        en: helper.featureObj,
        cn: helper.featureObj,
        jpn: helper.featureObj,
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
        en: helper.priceObject,
        cn: helper.priceObject,
        jpn: helper.priceObject,
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
