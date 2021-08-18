const { verifyToken } = require('../services/authServices')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')

const matchPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      throw new Error('User not found')
    }
    console.log(req.body.password, user.password)
    const tokenPayload = bcrypt.compareSync(req.body.password, user.password)

    console.log(tokenPayload)

    if (!tokenPayload) {
      throw new Error('Passwords do not match')
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 8)

    req.body.password = hashedPassword

    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).send({ message: err.message })
  }
}

module.exports = { matchPassword }
