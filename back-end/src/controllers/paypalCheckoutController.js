const { Order } = require('../models/orders')
const { User } = require('../models/user')

module.exports = {
  // update order to paid
  async paypalCheckout(req, res) {
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
        email_address: req.body.payer.email_address,
      }
      const updatedOrder = await order.save()

      //const foundUser = await User.findById()

      res.send(updatedOrder)
    } catch (error) {
      res.status(404).send({ message: error.message })
    }
  },
}
