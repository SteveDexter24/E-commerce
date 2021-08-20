const { Order } = require("../models/orders");
const { User } = require("../models/user");

module.exports = {
    async addOrderItems(req, res, next) {
        const { cart, id } = req.body;
        const {
            cartItems,
            shippingAddress,
            paymentMethod,
            shippingCost,
            tax,
            totalPrice,
        } = cart;
        const {
            username,
            name,
            address1,
            address2,
            surname,
            email,
            contactNum,
            country,
            city,
        } = shippingAddress;

        try {
            if (cartItems && cartItems.length === 0) {
                throw new Error("No order items");
            }

            if (!name || !surname || !email || !contactNum) {
                throw new Error(
                    "Name, surname, email address or contact number is required"
                );
            }

            if (!paymentMethod || !shippingCost || !tax || !totalPrice) {
                throw new Error("Some shipping information is missing");
            }

            const user = {
                username,
                name,
                surname,
                userId: id,
                email,
                contactNum,
            };
            const ship = {
                address1,
                address2,
                country,
                city,
            };

            const order = new Order({
                user,
                orderItems: cartItems,
                shippingAddress: ship,
                paymentMethod,
                shippingCost,
                tax,
                totalPrice,
            });

            const createdOrder = await Order.create(order);

            // Now add the order to user
            const foundUser = await User.findById(user.userId);
            foundUser.orders = foundUser.orders.concat(createdOrder._id);

            await foundUser.save();

            // send the created orders
            res.status(201).send(createdOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
};
