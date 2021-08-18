const { User } = require("../models/user");
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
    async getUserAsync(req, res, next) {
        const userId = req.params.id;

        try {
            const foundUser = await User.findById(userId);
            res.status(200).send(foundUser);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async editUserAsync(req, res, next) {
        const userId = req.params.id;
        var itemsToEdit = Object.keys(req.body);
        itemsToEdit = itemsToEdit.filter((x) => x !== "token");

        try {
            if (!req.body.password) {
                throw new Error("Password field is empty");
            }

            const user = await User.findById(userId);

            if (!user) {
                throw new Error("Could not find user");
            }

            itemsToEdit.forEach((prop) => {
                user[prop] = req.body[prop];
            });

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
                token: newToken,
            });
        } catch (error) {
            res.status(409).send({ message: error.message });
        }
    },
};
