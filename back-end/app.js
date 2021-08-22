const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const authRoute = require('./src/routes/authRoute')
const productRoute = require('./src/routes/productRoute')
const userRoute = require('./src/routes/userRoute')
const orderRoute = require('./src/routes/orderRoute')

app.use(cors())

// Connect to MongoDB
require('./src/db/mongoose')

// connect routes
app.use(authRoute)
app.use(productRoute)
app.use(userRoute)
app.use(orderRoute)
app.use(
  express.json({
    verify: (req, res, buffer) => (req['body'] = buffer),
  }),
)

module.exports = app
