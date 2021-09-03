const express = require("express");
const auth = require("../middlewares/auth");

const AuthController = require("../controllers/authController");

// Is Human? Middleware
const { validateHuman } = require("../middlewares/isHuman");

const router = express.Router();

router.post("/api/signin", AuthController.signIn);
router.post("/api/signup", validateHuman, AuthController.signUp);
router.post("/api/signout", auth, AuthController.signOut);

module.exports = router;
