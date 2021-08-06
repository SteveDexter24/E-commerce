const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async login(req, res) {
    const { username, password } = req.body

    if (password === null || password === undefined) {
      res.send({ auth: false, error: 'invalid password' })
      return
    }

    User.findOne({ username: username }, function (err, founduser) {
      if (err) {
        res.status(500).send({
          auth: false,
          error: 'user not found',
        })
        return
      }
      if (founduser === null) {
        res.send({
          auth: false,
          token: undefined,
          error: 'user not found',
        })
        return
      }

      var isPasswordValid = bcrypt.compareSync(password, founduser.password)

      if (!isPasswordValid) {
        console.log('wrong password')
        res.send({ auth: false, error: 'Incorrect Password' })
        return
      }

      const token = jwt.sign({ id: founduser._id }, 'secret')
      founduser.tokens = founduser.tokens.concat({ token })
      founduser.save()
      var user = founduser

      res.status(200).send({ auth: true, user, token: token })
    })
  },
  async signUp(req, res) {
    const { name, surname, username, password, email } = req.body

    console.log(req.body)

    var hashedPassword = bcrypt.hashSync(password, 8)

    User.create(
      {
        username: username,
        password: hashedPassword,
        email: email,
        name: name,
        surname: surname,
      },
      (err, user) => {
        if (err) {
          console.log(err)
          return res.send({
            signedUp: false,
            message: err.keyValue,
          })
        }

        res.status(200).send({ signedUp: true })
      },
    )
  },

  async logout(req, res) {
    const { token, userId } = req.body
    User.findById({ _id: userId }, (err, user) => {
      if (err) {
        return res.status(500).send({ error: 'Failed to logout' })
      }
      if (!user) {
        return res.status(404).send({ error: 'User not found' })
      }

      var filteredTokens = user.tokens.filter((t) => {
        return t.token !== token
      })

      console.log(filteredTokens)

      user.tokens = filteredTokens
      user.save()
      res.send({ message: 'Successfully logged user out' })
    })
  },
}
