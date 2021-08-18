const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const generateToken = async (user) => {
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      username: user.username,
    },
    secret,
  )

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

const verifyToken = async (token) => {
  return jwt.verify(token, 'secret')
}

module.exports = { generateToken, verifyToken }
