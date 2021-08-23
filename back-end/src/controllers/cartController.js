const { User } = require('../models/user')

module.exports = {
  async addToCart(req, res, next) {
    const userId = req.params.id
    //const { cartItems } = req.body
    // cartItems is an array
    return

    try {
      const foundUser = await User.findById(userId)

      console.log(cartItems)

      foundUser.cart = cartItems

      console.log(foundUser.cart)
      const cart = await foundUser.save()

      res.status(200).send(cart)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
}
