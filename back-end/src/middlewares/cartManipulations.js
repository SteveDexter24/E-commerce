const { User } = require('../models/user')

const cartManipulation = (req, res, next) => {
  const { cartItem } = req.body
  const userId = req.params.id;

  try {

    const foundUser = await User.findById(userId);

    const 

    const existItem = cartItems.find(
    (x) =>
      x.productId === item.productId &&
      x.size === item.size &&
      x.color === item.color,
  )



  }catch(error){

  }

  

  console.log(existItem)
  next()
}

module.exports = cartManipulation
