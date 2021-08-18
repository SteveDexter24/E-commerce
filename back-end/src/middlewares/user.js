const { verifyToken } = require("../services/authServices");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const matchPassword = async (req, res, next) => {
    const { currentPassword, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("User not found");
        }

        const tokenPayload = bcrypt.compareSync(currentPassword, user.password);

        if (!tokenPayload) {
            throw new Error("Current password is incorrect");
        }

        // old password is same as the new one
        const validPassword = bcrypt.compareSync(password, user.password);

        console.log(`Same password as old one: ${validPassword}`);

        if (validPassword) {
            throw new Error("New password same as the old one");
        }

        // if passwords match and valid password
        var hashedPassword = bcrypt.hashSync(password, 8);

        req.body.password = hashedPassword;

        next();
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
};

module.exports = { matchPassword };
