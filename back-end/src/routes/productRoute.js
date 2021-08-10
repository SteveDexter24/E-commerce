const express = require("express");

// Product Controller
const productController = require("../controllers/productController");

// Auth Middleware
const auth = require("../middlewares/auth");

// Admin Access Middleware
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// User and Admin access only
router.get("/api/products", productController.listAllProductsAsync);

// Admin access only
router.get(
    "/api/product/:id",
    auth,
    adminAuth,
    productController.getProductAsync
);
router.post(
    "/api/product",
    auth,
    adminAuth,
    productController.createProductAsync
);
router.patch(
    "/api/product/:id",
    auth,
    adminAuth,
    productController.updateProductAsync
);

module.exports = router;
