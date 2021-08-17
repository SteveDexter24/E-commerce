const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async signIn(req, res) {
        const { password, email } = req.body;

        try {
            const founduser = await User.findOne({ email });

            if (!founduser) {
                throw new Error();
            }

            try {
                var isPasswordValid = bcrypt.compareSync(
                    password,
                    founduser.password
                );
                if (!isPasswordValid) {
                    throw new Error();
                }
                const token = jwt.sign(
                    { id: founduser._id },
                    process.env.JWT_SECRET
                );
                founduser.tokens = founduser.tokens.concat({ token });
                founduser.save();
                var user = founduser;

                res.status(200).send({
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    memberShip: user.memberShip,
                    language: user.language,
                    token: token,
                });
            } catch (error) {
                res.status(409).send({
                    auth: false,
                    message: "Incorrect Password",
                });
            }
        } catch (err) {
            res.status(500).send({
                auth: false,
                token: undefined,
                message: "User not found",
            });
        }
    },
    async signUp(req, res) {
        var newUser = req.body;

        try {
            if (newUser.password === null || newUser.password === undefined) {
                throw new Error();
            }
            var hashedPassword = bcrypt.hashSync(newUser.password, 8);
            newUser.password = hashedPassword;
        } catch (error) {
            res.status(409).send({ message: "Please enter your password" });
        }

        try {
            const user = await User.create(newUser);
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            user.tokens = user.tokens.concat({ token });
            user.save();
            res.status(200).send({
                _id: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                role: user.role,
                memberShip: user.memberShip,
                language: user.language,
                token: token,
            });
        } catch (error) {
            res.status(409).send({
                message: "Problems occured when registering new user",
            });
        }
    },
    async signOut(req, res) {
        const { token, userId } = req.body;

        try {
            const user = await User.findById(userId);

            var filteredTokens = user.tokens.filter((t) => {
                return t.token !== token;
            });
            user.tokens = filteredTokens;
            user.save();
            res.send({ message: "Successfully logged user out" });
        } catch (error) {
            res.status(500).send({ message: "Failed to logout" });
        }
    },
};
