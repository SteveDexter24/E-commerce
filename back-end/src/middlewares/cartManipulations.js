const { User } = require('../models/user')

const cartManipulation = async (req, res, next) => {
  const userId = req.params.id

  // item = the new item to be updated
  const { item } = req.body
  //console.log(item)

  try {
    const foundUser = await User.findById(userId)

    const cartItems = foundUser.cart

    const existItem = cartItems.find(
      (x) =>
        x.productId.toString() === item.productId &&
        x.size === item.size &&
        x.color === item.color,
    )

    if (existItem) {
      const existIndex = cartItems.findIndex(
        (x) =>
          x.productId === existItem.productId &&
          x.size === existItem.size &&
          x.color === existItem.color,
      )

      //   console.log('old cart items')
      //   console.log(cartItems)

      cartItems[existIndex].qty =
        Number(cartItems[existIndex].qty) + Number(item.qty)

      //   console.log('new cart items')
      //   console.log(cartItems)
      req.cartItems = cartItems
      next()
    } else {
      cartItems.push(item)
      req.cartItems = cartItems
      next()
    }
  } catch (error) {
    res.send({ message: error.message })
  }
}

module.exports = cartManipulation
