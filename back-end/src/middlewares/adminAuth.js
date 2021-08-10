const adminAuth = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send({
            error: "admin access only",
        });
    }
};

module.exports = adminAuth;
