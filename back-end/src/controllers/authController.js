const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async signIn(req, res) {
        const { username, password, email } = req.body;

        if (password === null || password === undefined) {
            res.send({ auth: false, error: "invalid password" });
            return;
        }

        const authentiate = {
            $or: [{ username: username }, { email: email }],
        };

        User.findOne(authentiate, (err, founduser) => {
            if (err) {
                res.status(500).send({
                    auth: false,
                    error: "user not found",
                });
                return;
            }
            if (founduser === null) {
                res.send({
                    auth: false,
                    token: undefined,
                    error: "user not found",
                });
                return;
            }

            var isPasswordValid = bcrypt.compareSync(
                password,
                founduser.password
            );

            if (!isPasswordValid) {
                console.log("wrong password");
                res.send({ auth: false, error: "Incorrect Password" });
                return;
            }

            const token = jwt.sign(
                { id: founduser._id },
                process.env.JWT_SECRET
            );
            founduser.tokens = founduser.tokens.concat({ token });
            founduser.save();
            var user = founduser;

            res.status(200).send({ auth: true, user, token: token });
        });
    },
    async signUp(req, res) {
        var newUser = req.body;

        var hashedPassword = bcrypt.hashSync(newUser.password, 8);
        newUser.password = hashedPassword;

        User.create(newUser, (err, user) => {
            if (err) {
                return res.send({
                    signedUp: false,
                    message: err.keyValue,
                });
            }
            if (user) {
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET
                );
                user.tokens = user.tokens.concat({ token });
                user.save();
                res.status(200).send({
                    signedUp: true,
                    auth: true,
                    token: token,
                });
            } else {
                res.send({ error: "Failed to create new user" });
            }
        });
    },
    async signOut(req, res) {
        const { token, userId } = req.body;
        User.findById({ _id: userId }, (err, user) => {
            if (err) {
                return res.status(500).send({ error: "Failed to logout" });
            }
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }

            var filteredTokens = user.tokens.filter((t) => {
                return t.token !== token;
            });
            user.tokens = filteredTokens;
            user.save();
            res.send({ message: "Successfully logged user out" });
        });
    },
};
