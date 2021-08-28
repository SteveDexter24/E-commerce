const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

const authRoute = require('./src/routes/authRoute')
const productRoute = require('./src/routes/productRoute')
const userRoute = require('./src/routes/userRoute')
const orderRoute = require('./src/routes/orderRoute')
const stripeCheckoutRoute = require('./src/routes/stripeCheckoutRoute')
const paypalCheckoutRoute = require('./src/routes/paypalCheckoutRoute')
const cartRoute = require('./src/routes/cartRoute')

app.use(cors())

// Connect to MongoDB
require('./src/db/mongoose')

// connect routes
app.use(authRoute)
app.use(productRoute)
app.use(userRoute)
app.use(orderRoute)
app.use(cartRoute)
app.use(stripeCheckoutRoute)
app.use(paypalCheckoutRoute)

module.exports = app
