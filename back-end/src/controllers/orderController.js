import { Order } from '../models/orders'
import { User } from '../models/user'

module.exports = {
  async addOrderItems(req, res, next) {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      tax,
      shippingCost,
    } = req.body

    try {
      if (orderItems && orderItems.length === 0) {
        throw new Error('No order items')
      }

      const order = new Order({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        tax,
        shippingCost,
      })

      const createdOrder = await Order.create(order)
      if (createdOrder) {
        res.status(201).send(createdOrder)
        //User.
      }
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
}
