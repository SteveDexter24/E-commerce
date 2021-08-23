const express = require("express");

// Import auth middleware
const auth = require("../middlewares/auth");

// Import Cart Controller
const cartController = require("../controllers/cartController");

// Cart Manipulation
const cart = require("../middlewares/cartManipulations");

const router = express.Router();

router.post(
    "/api/user/:id/cart",
    auth,
    cart.addToCartMiddleware,
    cartController.addToCart
);

router.patch("/api/user/:id/update-cart", auth, cartController.updateCart);
router.patch("/api/user/:id/remove", auth, cartController.deleteItemInCart);

module.exports = router;
