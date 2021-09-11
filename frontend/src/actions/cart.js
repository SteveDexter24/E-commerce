import product from "../apis/api";
import {
    CART_ADD_ITEM,
    UPDATE_CART_ITEM,
    CART_REMOVE_ITEM,
    CART_ADD_ITEM_TO_DB,
    CART_REMOVE_ITEM_TO_DB,
    UPDATE_CART_ITEM_TO_DB,
    MOVE_CART_ITEM_TO_DB,
    CART_ADD_ITEM_TO_DB_FAIL,
    CART_REMOVE_ITEM_TO_DB_FAIL,
    UPDATE_CART_ITEM_TO_DB_FAIL,
    MOVE_CART_ITEM_TO_DB_FAIL,
    CART_ADD_ITEM_TO_DB_REQUEST,
    CART_REMOVE_ITEM_TO_DB_REQUEST,
    UPDATE_CART_ITEM_TO_DB_REQUEST,
    MOVE_CART_ITEM_TO_DB_REQUEST,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_USER_SHIPPING_INFO,
} from "./types";

import { configUtil } from "../Utils/apiConfig";
import { errorHandler } from "../Utils/errorHandling";

export const addToCartDB =
    (productId, qty, sizeType, color) => async (dispatch, getState) => {
        // After setting the cart items, the send a post request to the server;
        const { userInfo } = getState().userAuth;
        try {
            const { data } = await product.get(`/product/${productId}`);
            const getSize = data.size.filter((s) => s.sizeType === sizeType);

            const colorRemaining = getSize[0].colors.filter(
                (s) => s.color[getState().settings.language] === color
            );

            dispatch({ type: CART_ADD_ITEM_TO_DB_REQUEST });
            const response = await product.post(
                `/user/${userInfo._id}/cart`,
                {
                    item: {
                        productId: data._id,
                        name: data.productName[getState().settings.language],
                        description:
                            data.description[getState().settings.language],
                        discount: data.discount[getState().settings.currency],
                        image: data.image,
                        price: data.price[getState().settings.currency],
                        size: sizeType,
                        qty: Number(qty),
                        color: color,
                        totalSize: colorRemaining ? colorRemaining[0].count : 1,
                    },
                },
                configUtil(userInfo.token)
            );

            dispatch({ type: CART_ADD_ITEM_TO_DB, payload: response.data });
            localStorage.setItem("cartItems", JSON.stringify(response.data));
        } catch (error) {
            dispatch({
                type: CART_ADD_ITEM_TO_DB_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const addToCart =
    (productId, qty, sizeType, color) => async (dispatch, getState) => {
        try {
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
                    discount: data.discount[getState().settings.currency],
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
        } catch (error) {
            console.log(error);
        }
    };

export const updateCartToDB =
    (productId, qty, sizeType, color, cartIndex, description) =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;

        try {
            dispatch({ type: UPDATE_CART_ITEM_TO_DB_REQUEST });
            const { data } = await product.patch(
                `/user/${userInfo._id}/update-cart`,
                {
                    productId: productId,
                    size: sizeType,
                    qty: Number(qty),
                    color: color,
                },

                configUtil(userInfo.token)
            );
            dispatch({ type: UPDATE_CART_ITEM_TO_DB, payload: data });
            localStorage.setItem("cartItems", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: UPDATE_CART_ITEM_TO_DB_FAIL,
                payload: errorHandler(error),
            });
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
    };

export const removeCartItemInDB =
    (productId, size, color) => async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;

        try {
            dispatch({ type: CART_REMOVE_ITEM_TO_DB_REQUEST });
            const { data } = await product.patch(
                `/user/${userInfo._id}/remove`,
                {
                    productId: productId,
                    size: size,
                    color: color,
                },
                configUtil(userInfo.token)
            );
            dispatch({ type: CART_REMOVE_ITEM_TO_DB, payload: data });
            localStorage.setItem("cartItems", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: CART_REMOVE_ITEM_TO_DB_FAIL,
                payload: errorHandler(error),
            });
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
    };

export const moveCartToDB = (cartItems) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: MOVE_CART_ITEM_TO_DB_REQUEST });

        const { data } = await product.post(
            `/user/${userInfo._id}/move-cart-to-db`,
            { cartItems },
            configUtil(userInfo.token)
        );
        console.log(data);
        dispatch({ type: MOVE_CART_ITEM_TO_DB, payload: data });

        // remove locally stored cart item
        localStorage.setItem("cartItems", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: MOVE_CART_ITEM_TO_DB_FAIL,
            payload: errorHandler(error),
        });
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
