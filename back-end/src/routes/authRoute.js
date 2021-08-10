const express = require("express");
const auth = require("../middlewares/auth");

const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/api/signin", AuthController.signIn);
router.post("/api/signup", AuthController.signUp);
router.post("/api/signout", auth, AuthController.signOut);

module.exports = router;
