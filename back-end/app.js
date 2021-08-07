const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./src/routes/authRoute");
const productRoute = require("./src/routes/productRoute");

app.use(cors());

// Connect to MongoDB
require("./src/db/mongoose");

// connect routes
app.use(authRoute);
app.use(productRoute);

module.exports = app;
