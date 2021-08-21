const { Order } = require('../models/orders')
const { User } = require('../models/user')

module.exports = {
  async addOrderItems(req, res) {
    const { cart } = req.body
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingCost,
      tax,
      totalPrice,
    } = cart

    try {
      if (!orderItems && orderItems.length === 0) {
        throw new Error('No order items')
      }
      if (
        !user ||
        !user.email ||
        !user.contactNum ||
        !user.name ||
        !user.surname
      ) {
        throw new Error('User Information is incomplete')
      }

      if (!shippingAddress) {
        throw new Error('Shipping address is required')
      }

      if (!paymentMethod || !shippingCost || !tax || !totalPrice) {
        throw new Error(
          'Some shipping information such as payment methods, shipping fees are missing',
        )
      }

      const order = new Order(cart)

      const createdOrder = await Order.create(order)

      // Now add the order to user
      const foundUser = await User.findById(user.userId)
      foundUser.orders = foundUser.orders.concat(createdOrder._id)

      await foundUser.save()

      // send the created orders
      res.status(201).send(createdOrder)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
  async getOrder(req, res) {
    const orderId = req.params.id
    try {
      const order = await Order.findById(orderId)
      res.send(order)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
}
