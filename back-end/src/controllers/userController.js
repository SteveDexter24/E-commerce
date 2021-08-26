const { User } = require("../models/user");
const { Order } = require("../models/orders");
const jwt = require("jsonwebtoken");

module.exports = {
    async listUserAsync(req, res, next) {
        try {
            const users = await User.find({});
            res.send(users);
        } catch (err) {
            res.status(404).send({
                error: err.message,
                message: "Could not load all the users",
            });
        }
    },
    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            await User.findByIdAndDelete(userId);
            res.status(200).send("User removed");
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId).select(
                "-password -tokens -location"
            );
            res.status(200).send(user);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async updateUser(req, res) {
        const userId = req.params.id;

        const itemsToUpdate = Object.keys(req.body);
        try {
            const user = await User.findById(userId).select(
                "-password -tokens -locations -orderHistory -orders"
            );

            itemsToUpdate.forEach((item) => {
                user[item] = req.body[item];
            });
            const updatedUser = await user.save();
            res.send(updatedUser);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async getUserAsync(req, res, next) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);

            res.status(200).send({
                _id: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                address1: user.address1,
                address2: user.address2,
                country: user.country,
                city: user.city,
                role: user.role,
                memberShip: user.memberShip,
                language: user.language,
                orderHistory: user.orderHistory,
                contactNum: user.contactNum,
                token: req.token,
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async editUserAsync(req, res, next) {
        const userId = req.params.id;
        var itemsToEdit = Object.keys(req.body);
        itemsToEdit = itemsToEdit.filter((x) => x !== "token");

        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error("Could not find user");
            }

            itemsToEdit.forEach((prop) => {
                user[prop] = req.body[prop];
            });

            // New token generation
            // remove old token
            var filteredTokens = user.tokens.filter((t) => {
                return t.token !== req.body.token;
            });
            user.tokens = filteredTokens;

            // set new token
            const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            // add new token to user
            user.tokens = user.tokens.concat({ token: newToken });

            // save updated user info
            await user.save();

            res.status(200).send({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                memberShip: user.memberShip,
                language: user.language,
                contactNum: user.contactNum,
                token: newToken,
            });
        } catch (error) {
            res.status(409).send({ message: error.message });
        }
    },
    async getUserOrders(req, res) {
        const userId = req.params.id;

        try {
            const orders = await Order.find({ "user.userId": userId })
                .limit(10)
                .sort({ createdAt: -1 });

            res.send(orders);
        } catch (error) {
            res.send({ message: error.message });
        }
    },
};
