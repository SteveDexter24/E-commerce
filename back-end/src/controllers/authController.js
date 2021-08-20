const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async signIn(req, res) {
    const { password, email } = req.body

    try {
      const founduser = await User.findOne({ email })

      if (!founduser) {
        throw new Error()
      }

      try {
        var isPasswordValid = bcrypt.compareSync(password, founduser.password)
        if (!isPasswordValid) {
          throw new Error()
        }
        const token = jwt.sign({ id: founduser._id }, process.env.JWT_SECRET)
        founduser.tokens = founduser.tokens.concat({ token })
        await founduser.save()
        var user = founduser

        res.status(200).send({
          _id: user._id,
          username: user.username,
          name: user.name,
          surname: user.surname,
          email: user.email,
          address1: user.address1,
          address2: user.address2,
          country: user.country,
          city: user.city,
          role: user.role,
          memberShip: user.memberShip,
          language: user.language,
          contactNum: user.contactNum,
          token: token,
        })
      } catch (error) {
        res.status(409).send({
          auth: false,
          message: 'Incorrect Password',
        })
      }
    } catch (err) {
      res.status(500).send({
        auth: false,
        token: undefined,
        message: 'User not found',
      })
    }
  },
  async signUp(req, res) {
    var newUser = req.body

    try {
      if (newUser.password === null || newUser.password === undefined) {
        throw new Error('Please enter your password')
      }
      var hashedPassword = bcrypt.hashSync(
        newUser.password,
        8,
        // process.env.HASH_SALT,
      )
      newUser.password = hashedPassword
    } catch (error) {
      res.status(409).send({ message: error.message })
    }

    try {
      const user = await User.create(newUser)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      user.tokens = user.tokens.concat({ token })
      user.save()
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        memberShip: user.memberShip,
        language: user.language,
        token: token,
      })
    } catch (error) {
      console.log(error)
      var message = 'Problem creating a new user'
      const { keyValue } = error
      if (Object.keys(keyValue)[0] === 'username') {
        message = `Username of ${keyValue.username} is already taken. Please enter another username.`
      }
      //if(Object.keys(keyValue)[0] === 'email')
      if (Object.keys(keyValue)[0] === 'email') {
        message = `Email address of ${keyValue.email} is already taken. Please enter another email address.`
      }

      res.status(409).send({
        message: message,
      })
    }
  },
  async signOut(req, res) {
    const { token, userId } = req.body

    try {
      const user = await User.findById(userId)

      var filteredTokens = user.tokens.filter((t) => {
        return t.token !== token
      })
      user.tokens = filteredTokens
      await user.save()
      res.send({ message: 'Successfully logged user out', logout: true })
    } catch (error) {
      res.status(500).send({ message: 'Failed to logout' })
    }
  },
}
