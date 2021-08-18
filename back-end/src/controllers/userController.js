const { User } = require('../models/user')

module.exports = {
  async listUserAsync(req, res, next) {
    try {
      const users = await User.find({})
      res.send(users)
    } catch (err) {
      res.status(404).send({
        error: err.message,
        message: 'Could not load all the users',
      })
    }
  },
  async getUserAsync(req, res, next) {
    const userId = req.params.id

    try {
      const foundUser = await User.findById(userId)
      res.status(200).send(foundUser)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },

  async editUserAsync(req, res, next) {
    const userId = req.params.id
    console.log(userId)
    const itemsToEdit = Object.keys(req.body)
    try {
      if (!itemsToEdit.password) {
        throw new Error()
      }
      try {
        const user = await User.findById(userId)
        itemsToEdit.forEach((prop) => {
          user[prop] = req.body[prop]
        })

        await updateUser.save()
        res.send({ message: 'Successfully updated user' })
      } catch (error) {
        res.send({
          error: error.message,
          message: 'Failed to update user',
        })
      }
    } catch (error) {
      res.status(409).send({ message: 'Password field is empty' })
    }
  },
}
