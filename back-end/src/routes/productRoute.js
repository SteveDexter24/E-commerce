const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

// User access only
router.get("/api/products", productController.listAllProductsAsync);

// Admin access only
router.get("/api/product/:id", productController.getProductAsync);
router.post("/api/product", productController.createProductAsync);
router.patch("/api/product/:id", productController.updateProductAsync);

module.exports = router;
