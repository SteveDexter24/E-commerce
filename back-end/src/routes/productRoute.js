const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/api/products", productController.listAllProductsAsync);
router.get("/api/product/:id", productController.getProductAsync);
router.post("/api/product", productController.createProductAsync);

module.exports = router;
