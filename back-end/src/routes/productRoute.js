const express = require('express')

// Product Controller
const productController = require('../controllers/productController')

// Auth Middleware
const auth = require('../middlewares/auth')

// Admin Access Middleware
const adminAuth = require('../middlewares/adminAuth')

// Upload image middleware
const uploadImageMiddleware = require('../middlewares/uploadImage')

const router = express.Router()

// User and Admin access only
router.get('/api/products', productController.listAllProductsAsync)
router.get('/api/product/:id', productController.getProductAsync)

// Admin access only
router.post(
  '/api/product',
  auth,
  adminAuth,
  uploadImageMiddleware,
  productController.createProductAsync,
)
router.patch(
  '/api/product/:id',
  auth,
  adminAuth,
  uploadImageMiddleware,
  productController.updateProductAsync,
)

router.delete(
  '/api/product/:id',
  auth,
  adminAuth,
  productController.deleteProductAsync,
)

module.exports = router
