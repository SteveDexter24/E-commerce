import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_SESSION_REQUEST,
    ORDER_SESSION_SUCCESS,
    ORDER_SESSION_FAIL,
    GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    GET_USER_ORDER_FAIL,
    USER_ORDER_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from "../actions/types";

export const orderCreateReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true, success: false };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, success: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { paypalLoading: true };
        case ORDER_PAY_SUCCESS:
            return { paypalLoading: false, paypalSuccess: true };
        case ORDER_PAY_FAIL:
            return { paypalLoading: false, paypalError: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const checkoutWithStripeReducer = (
    state = { session: false },
    action
) => {
    switch (action.type) {
        case ORDER_SESSION_REQUEST:
            return { session: true };
        case ORDER_SESSION_SUCCESS:
            return { session: false, sessionId: action.payload };
        case ORDER_SESSION_FAIL:
            return { session: false, sessionError: action.payload };
        default:
            return state;
    }
};

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_USER_ORDER_REQUEST:
            return { loading: true };
        case GET_USER_ORDER_SUCCESS:
            return { loading: false, orders: action.payload };
        case GET_USER_ORDER_FAIL:
            return { loading: false, error: action.payload };
        case USER_ORDER_RESET:
            return { orders: [] };
        default:
            return state;
    }
};

export const listAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loadingDelete: true };
        case ORDER_DELETE_SUCCESS:
            return {
                loadingDelete: false,
                message: action.payload,
            };
        case ORDER_DELETE_FAIL:
            return {
                loadingDelete: false,
                error: action.payload,
            };
        case ORDER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true };
        case ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    }
};
