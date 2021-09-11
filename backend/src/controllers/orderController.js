const { Order } = require("../models/orders");
const { User } = require("../models/user");

module.exports = {
    async addOrderItems(req, res) {
        const { cart } = req.body;
        const {
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingCost,
            tax,
            totalPrice,
            itemsPrice,
        } = cart;

        try {
            if (!orderItems && orderItems.length === 0) {
                throw new Error("No order items");
            }
            if (
                !user ||
                !user.email ||
                !user.contactNum ||
                !user.name ||
                !user.surname
            ) {
                throw new Error("User Information is incomplete");
            }

            if (!shippingAddress) {
                throw new Error("Shipping address is required");
            }

            if (!paymentMethod || !shippingCost || !totalPrice || !itemsPrice) {
                throw new Error(
                    "Some shipping information such as payment methods, shipping fees are missing"
                );
            }

            const order = new Order(cart);

            const createdOrder = await Order.create(order);

            const foundUser = await User.findById(user.userId);
            // Add the order to user
            foundUser.orders = foundUser.orders.concat(createdOrder._id);
            // Remove CartItems
            foundUser.cart = [];
            await foundUser.save();

            // send the created orders
            res.status(201).send(createdOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    async getOrder(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);
            res.send(order);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async deleteOrder(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);

            const user = await User.findById(order.user.userId);

            const orders = user.orders.filter(
                (item) => item.toString() !== orderId
            );

            user.orders = orders;
            await user.save();

            await order.remove();
            res.status(200).send("Successfully deleted order");
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    async getAllOrders(req, res) {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const searchArray = [
            { paymentMethod: { $regex: req.query.keyword, $options: "i" } },
            { "user.name": { $regex: req.query.keyword, $options: "i" } },
            { "user.surname": { $regex: req.query.keyword, $options: "i" } },
        ];

        //const orderId = req.query.orderId;

        try {
            const count = await Order.countDocuments({ $or: searchArray });
            const orders = await Order.find({ $or: searchArray })
                .populate("user", "id name")
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ createdAt: -1 });

            res.status(200).send({
                orders,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async updateOrderToDelivered(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);
            if (order.isDelivered === true) {
                order.isDelivered = false;
                order.deliveredAt = null;
            } else {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.send(updatedOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
};
