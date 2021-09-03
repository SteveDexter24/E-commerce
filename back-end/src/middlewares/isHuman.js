const axios = require("axios");

const validateHuman = async (req, res, next) => {
    const recaptchaToken = req.body.token;
    const secret = process.env.RECAPTCHA_SECRETE_KEY;

    try {
        const { data } = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`
        );
        console.log(data.success);
        if (!data.success) {
            throw new Error("I think you are a robot");
        }

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = { validateHuman };
