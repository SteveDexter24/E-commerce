const express = require("express");

// Import auth middleware
const auth = require("../middlewares/auth");

// Import Order Controller
const OrderController = require("../controllers/orderController");

const router = express.Router();

router.post("/api/order", auth, OrderController.addOrderItems);

module.exports = router;
