const express = require("express");

// Import auth middleware
const auth = require("../middlewares/auth");

// Import Admin auth middleware
const adminAuth = require("../middlewares/adminAuth");

// Import Order Controller
const OrderController = require("../controllers/orderController");

// Is Human? Middleware
const { validateHuman } = require("../middlewares/isHuman");

const router = express.Router();

// User and Admin access only
router.post("/api/order", auth, validateHuman, OrderController.addOrderItems);
router.get("/api/order/:id", auth, OrderController.getOrder);
router.delete("/api/order/:id", auth, OrderController.deleteOrder);

// Admin access only
// Get all the orders from the database
router.get("/api/orders", auth, adminAuth, OrderController.getAllOrders);
router.patch(
    "/api/order/:id/deliver",
    auth,
    adminAuth,
    OrderController.updateOrderToDelivered
);

module.exports = router;
