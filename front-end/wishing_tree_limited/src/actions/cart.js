import product from "../apis/api";
import {
    CART_ADD_ITEM,
    UPDATE_CART_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_USER_SHIPPING_INFO,
} from "./types";

export const addToCart =
    (productId, qty, sizeType, color) => async (dispatch, getState) => {
        const { data } = await product.get(`/product/${productId}`);

        const getSize = data.size.filter((s) => s.sizeType === sizeType);

        const colorRemaining = getSize[0].colors.filter(
            (s) => s.color[getState().settings.language] === color
        );
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                productId: data._id,
                name: data.productName[getState().settings.language],
                description: data.description[getState().settings.language],
                image: data.image,
                price: data.price[getState().settings.currency],
                size: sizeType,
                qty: Number(qty),
                color: color,
                totalSize: colorRemaining ? colorRemaining[0].count : 1,
            },
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );

        // After setting the cart items, the send a post request to the server;
        const { userInfo } = getState().userAuth;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await product.post(
                `/user/${userInfo._id}/cart`,
                {
                    item: {
                        productId: data._id,
                        name: data.productName[getState().settings.language],
                        description:
                            data.description[getState().settings.language],
                        image: data.image,
                        price: data.price[getState().settings.currency],
                        size: sizeType,
                        qty: Number(qty),
                        color: color,
                        totalSize: colorRemaining ? colorRemaining[0].count : 1,
                    },
                },
                config
            );

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

export const updateCart =
    (productId, qty, sizeType, color, cartIndex, description) =>
    async (dispatch, getState) => {
        dispatch({
            type: UPDATE_CART_ITEM,
            payload: {
                productId: productId,
                qty: Number(qty),
                size: sizeType,
                color: color,
                cartIndex: cartIndex,
                description: description,
            },
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
        console.log(getState().cart.cartItems);
        const { userInfo } = getState().userAuth;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await product.patch(
                `/user/${userInfo._id}/update-cart`,
                {
                    productId: productId,
                    size: sizeType,
                    qty: Number(qty),
                    color: color,
                },

                config
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

export const removeItemInCart =
    (productId, size, color) => async (dispatch, getState) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: {
                productId: productId,
                size: size,
                color: color,
            },
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );

        const { userInfo } = getState().userAuth;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await product.patch(
                `/user/${userInfo._id}/remove`,
                {
                    productId: productId,
                    size: size,
                    color: color,
                },
                config
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const saveUserShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_USER_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("userShippingInfo", JSON.stringify(data));
};

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
