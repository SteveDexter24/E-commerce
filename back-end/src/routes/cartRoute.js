const express = require('express')

// Import auth middleware
const auth = require('../middlewares/auth')

// Import Cart Controller
const cartController = require('../controllers/cartController')

// Cart Manipulation
const cart = require('../middlewares/cartManipulations')

const router = express.Router()

router.post('/api/user/:id/cart', auth, cart, cartController.addToCart)

module.exports = router
