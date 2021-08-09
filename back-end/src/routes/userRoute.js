const express = require('express');
const auth = require("../middlewares/auth");

const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/api/users", auth, UserController.listUserAsync);
router.get("/api/user/:id", auth, UserController.getUserAsync);
router.patch("/api/user/:id", auth, UserController.editUserAsync)