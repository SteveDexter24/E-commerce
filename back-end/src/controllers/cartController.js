const { User } = require('../models/user')

module.exports = {
  async addToCart(req, res, next) {
    const userId = req.params.id
    const cartItems = req.cartItems

    try {
      const foundUser = await User.findById(userId)

      foundUser.cart = cartItems

      const cart = await foundUser.save()

      res.status(200).send(cart.cart)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
}
