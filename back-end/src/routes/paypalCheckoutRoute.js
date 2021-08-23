const express = require('express')

// Import auth middleware
const auth = require('../middlewares/auth')
const { route } = require('./orderRoute')

const paypalCheckoutController = require('../controllers/paypalCheckoutController')

const router = express.Router()

router.patch(
  '/api/order/:id/pay',
  auth,
  paypalCheckoutController.paypalCheckout,
)

// Config route to get sentive information (Paypal clientID)
router.get('/api/config/paypal', auth, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
)
module.exports = router
