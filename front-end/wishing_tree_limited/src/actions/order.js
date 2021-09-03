import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_SESSION_REQUEST,
    ORDER_SESSION_SUCCESS,
    ORDER_SESSION_FAIL,
    GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    GET_USER_ORDER_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from "./types";
import orders from "../apis/api";
import { configUtil } from "../Utils/apiConfig";
import { errorHandler } from "../Utils/errorHandling";

// Place Order
export const createOrder = (cart, token) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    const { token: userToken } = userInfo;
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { data } = await orders.post(
            `/order`,
            {
                cart,
                token,
            },
            configUtil(userToken)
        );
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        // if successful order then remove cart items
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: errorHandler(error),
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    const { token } = userInfo;
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await orders.get(`/order/${id}`, configUtil(token));
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: errorHandler(error),
        });
    }
};

// For paypal
export const payOrder =
    (orderId, paymentResult) => async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        const { token } = userInfo;
        try {
            dispatch({ type: ORDER_PAY_REQUEST });

            const { data } = await orders.patch(
                `/order/${orderId}/pay`,
                paymentResult,
                configUtil(token)
            );
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const createSessionCheckoutWithStripe =
    (
        line_items,
        email,
        payment_method_types,
        orderId,
        shippingCost,
        tax,
        currency
    ) =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        const { token } = userInfo;

        dispatch({ type: ORDER_SESSION_REQUEST });

        try {
            const { data } = await orders.post(
                `/order/${orderId}/create-checkout-session`,
                {
                    line_items,
                    email,
                    payment_method_types,
                    shippingCost,
                    tax,
                    currency,
                },
                configUtil(token)
            );

            dispatch({ type: ORDER_SESSION_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_SESSION_FAIL,
                payload: errorHandler(error),
            });
        }
    };

// Get user's orders
export const getUserOrders = () => async (dispatch, getState) => {
    const userAuth = getState().userAuth;
    const { userInfo } = userAuth;

    try {
        dispatch({ type: GET_USER_ORDER_REQUEST });
        const { data } = await orders.get(
            `/user/${userInfo._id}/orders`,
            configUtil(userInfo.token)
        );

        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_USER_ORDER_FAIL,
            payload: errorHandler(error),
        });
    }
};

// Get All Orders
export const listAllOrders =
    (keyword = "", pageNumber = "", orderId = "") =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        try {
            dispatch({ type: ORDER_LIST_REQUEST });

            const { data } = await orders.get(
                `/orders?keyword=${keyword}&pageNumber=${pageNumber}&orderId=${orderId}`,
                configUtil(userInfo.token)
            );

            dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: ORDER_LIST_FAIL, payload: errorHandler(error) });
        }
    };

export const deleteOrder = (id) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: ORDER_DELETE_REQUEST });
        await orders.delete(`/order/${id}`, configUtil(userInfo.token));
        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: "Successfully deleted order",
        });
    } catch (error) {
        dispatch({ type: ORDER_DELETE_FAIL, payload: errorHandler(error) });
    }
};

// Mark order as deliver
export const deliverOrder = (id) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST });
        const { order } = await orders.patch(
            `/order/${id}/deliver`,
            {},
            configUtil(userInfo.token)
        );
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: order });
    } catch (error) {
        dispatch({ type: ORDER_DELIVER_FAIL, payload: errorHandler(error) });
    }
};
