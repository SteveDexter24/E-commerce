const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const authRoute = require('./src/routes/authRoute')

app.use(cors())

// Connect to MongoDB
require('./src/db/mongoose')

// connect routes
app.use(authRoute)

module.exports = app
