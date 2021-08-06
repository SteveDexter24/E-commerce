const express = require('express')
const auth = require('../middlewares/auth')

const AuthController = require('../controllers/authController')

const router = express.Router()

router.post('/api/login', AuthController.login)
router.post('/api/signup', AuthController.signUp)
router.post('/api/logout', auth, AuthController.logout)

module.exports = router
