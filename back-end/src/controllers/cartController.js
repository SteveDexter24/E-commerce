const { User } = require("../models/user");

module.exports = {
    async addToCart(req, res, next) {
        const userId = req.params.id;
        const cartItems = req.cartItems;

        try {
            const foundUser = await User.findById(userId);

            foundUser.cart = cartItems;

            const cart = await foundUser.save();

            res.status(200).send(cart.cart);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    async updateCart(req, res, next) {
        const userId = req.params.id;
        const { qty, productId, size, color } = req.body;
        console.log(req.body);

        try {
            const foundUser = await User.findById(userId);
            let cartItems = foundUser.cart;

            const productExist = cartItems.find(
                (x) =>
                    x.productId.toString() === productId &&
                    x.size === size &&
                    x.color === color
            );

            if (!productExist) {
                throw new Error("Product does not exist");
            }
            const productIndex = cartItems.findIndex(
                (x) =>
                    x.productId === productExist.productId &&
                    x.color === productExist.color &&
                    x.size === productExist.size
            );

            if (cartItems[productIndex]) {
                console.log(productIndex, qty);
                cartItems[productIndex].qty = Number(qty);
            } else {
                throw new Error();
            }

            foundUser.cart = cartItems;

            const cart = await foundUser.save();
            res.status(200).send(cart.cart);

            //cartItems
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    async deleteItemInCart(req, res, next) {
        const userId = req.params.id;

        const { productId, size, color } = req.body;

        try {
            const foundUser = await User.findById(userId);

            const cartItems = foundUser.cart;

            const removeIndex = cartItems.findIndex(
                (x) =>
                    x.productId.toString() === productId &&
                    x.size === size &&
                    x.color === color
            );

            if (removeIndex != -1) {
                let newCart = cartItems.filter((_, i) => i != removeIndex);

                foundUser.cart = newCart;
                const updatedCart = await foundUser.save();
                res.status(200).send(updatedCart.cart);
            } else {
                throw new Error("could not find the item to delete");
            }
        } catch (error) {
            res.send({ message: error.message });
        }
    },
};
