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
      itemsPrice,
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

      if (
        !paymentMethod ||
        !shippingCost ||
        !tax ||
        !totalPrice ||
        !itemsPrice
      ) {
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
    console.log('get order')
    const orderId = req.params.id
    try {
      const order = await Order.findById(orderId)
      res.send(order)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
  // update order to paid
  async updateOrderToPaid(req, res) {
    const orderId = req.params.id
    try {
      const order = await Order.findById(orderId)
      order.isPaid = true
      order.paidAt = Date.now()
      // from paypal
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.pair.email_address,
      }
      const updatedOrder = await order.save()
      res.send(updatedOrder)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
}
