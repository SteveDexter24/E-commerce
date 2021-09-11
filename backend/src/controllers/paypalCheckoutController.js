const { Order } = require("../models/orders");
const { Product } = require("../models/products");

module.exports = {
    // update order to paid
    async paypalCheckout(req, res) {
        const orderId = req.params.id;

        try {
            const foundOrder = await Order.findById(orderId);

            let order = foundOrder.orderItems;

            for (let i = 0; i < order.length; i++) {
                const product = await Product.findById(order[i].productId);

                for (let j = 0; j < product.size.length; j++) {
                    if (product.size[j].sizeType === order[i].size) {
                        for (
                            let k = 0;
                            k < product.size[j].colors.length;
                            k++
                        ) {
                            if (
                                product.size[j].colors[k].color.en ===
                                    order[i].color ||
                                product.size[j].colors[k].color.cn ===
                                    order[i].color ||
                                product.size[j].colors[k].color.jpn ===
                                    order[i].color
                            ) {
                                console.log(product.size[j].colors[k].count);
                                product.size[j].colors[k].count -= order[i].qty;
                                console.log("-------");
                                await product.save();
                                console.log(product.size[j].colors[k].count);
                            }
                        }
                    }
                }
            }

            foundOrder.isPaid = true;
            foundOrder.paidAt = Date.now();
            // from paypal
            foundOrder.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };
            const updatedOrder = await foundOrder.save();

            //const foundUser = await User.findById()

            res.send(updatedOrder);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
};
