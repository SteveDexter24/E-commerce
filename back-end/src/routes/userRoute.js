const express = require("express");

// User Controller
const UserController = require("../controllers/userController");

// Auth Middleware
const auth = require("../middlewares/auth");

// Admin Middleware
const adminAuth = require("../middlewares/adminAuth");

//User Middleware
const { matchPassword } = require("../middlewares/user");

const router = express.Router();

router.get("/api/user/:id?", auth, UserController.getUserAsync);
router.patch(
    "/api/user/:id",
    auth,
    matchPassword,
    UserController.editUserAsync
);
router.get("/api/user/:id/orders", auth, UserController.getUserOrders);

// Admin
router.get("/api/users", auth, adminAuth, UserController.listUserAsync);
router.delete(
    "/api/user/:id/admin",
    auth,
    adminAuth,
    UserController.deleteUser
);
router.get("/api/user/:id/admin", auth, adminAuth, UserController.getUserById);
router.patch("/api/user/:id/admin", auth, adminAuth, UserController.updateUser);
module.exports = router;
