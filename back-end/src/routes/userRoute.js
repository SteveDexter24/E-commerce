const express = require('express')

// User Controller
const UserController = require('../controllers/userController')

// Auth Middleware
const auth = require('../middlewares/auth')

// Admin Middleware
const adminAuth = require('../middlewares/adminAuth')

const router = express.Router()

router.get('/api/users', auth, adminAuth, UserController.listUserAsync)
router.get('/api/user/:id?', UserController.getUserAsync)
router.patch('/api/user/:id', auth, adminAuth, UserController.editUserAsync)

module.exports = router
