const express = require('express')
const bodyParser = require('body-parser')

// Import auth middleware
const auth = require('../middlewares/auth')

// Get Image Middleware
const {
  getImageForStripeCheckoutMiddleware,
} = require('../middlewares/uploadImage')

const router = express.Router()

const stripeCheckoutController = require('../controllers/stripeCheckoutController')

router.post(
  '/api/order/:id/create-checkout-session',
  auth,
  getImageForStripeCheckoutMiddleware,
  stripeCheckoutController.createCheckOutSessionWithStripe,
)
// Webhook Endpoint
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeCheckoutController.webhookStripe,
)

module.exports = router
