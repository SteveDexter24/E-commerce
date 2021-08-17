const { verifyToken } = require("../services/authServices");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const header = req.header("Authorization");
        if (header.substring(0, 7) !== "Bearer ") {
            throw new Error();
        }
        const token = header.replace("Bearer ", "");
        const tokenPayload = await verifyToken(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: tokenPayload.id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        req.tokenPayload = tokenPayload;
        next();
    } catch (err) {
        res.status(401).send({ message: "Use not logged in or unthorized" });
    }
};

module.exports = auth;
