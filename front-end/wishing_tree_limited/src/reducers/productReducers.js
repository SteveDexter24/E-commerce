import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    EDIT_PRODUCT_RESET,
    CREATE_PRODUCT_RESET,
    FETCH_MEN_PRODUCT_REQUEST,
    FETCH_MEN_PRODUCT_SUCCESS,
    FETCH_MEN_PRODUCT_FAIL,
    FETCH_WOMEN_PRODUCT_REQUEST,
    FETCH_WOMEN_PRODUCT_SUCCESS,
    FETCH_WOMEN_PRODUCT_FAIL,
    FETCH_KIDS_PRODUCT_REQUEST,
    FETCH_KIDS_PRODUCT_SUCCESS,
    FETCH_KIDS_PRODUCT_FAIL,
    FETCH_LATEST_PRODUCT_REQUEST,
    FETCH_LATEST_PRODUCT_SUCCESS,
    FETCH_LATEST_PRODUCT_FAIL,
    FETCH_DISCOUNTED_PRODUCT_REQUEST,
    FETCH_DISCOUNTED_PRODUCT_SUCCESS,
    FETCH_DISCOUNTED_PRODUCT_FAIL,
    PRODUCTS_YOU_MAY_LIKE_REQUEST,
    PRODUCTS_YOU_MAY_LIKE_SUCCESS,
    PRODUCTS_YOU_MAY_LIKE_FAIL,
} from "../actions/types";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: action.payload };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { loading: true, ...state };
        case FETCH_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case FETCH_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { loading: true };
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, success: true };
        case DELETE_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true };
        case CREATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case CREATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const productEditReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
            return { loading: true };
        case EDIT_PRODUCT_SUCCESS:
            return { loading: false, success: action.payload };
        case EDIT_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case EDIT_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const mensProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MEN_PRODUCT_REQUEST:
            return { loading: true };
        case FETCH_MEN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.menProduct,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case FETCH_MEN_PRODUCT_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const womenProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_WOMEN_PRODUCT_REQUEST:
            return { loading: true };
        case FETCH_WOMEN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.womenProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case FETCH_WOMEN_PRODUCT_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const kidsProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_KIDS_PRODUCT_REQUEST:
            return { loading: true };
        case FETCH_KIDS_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.kidsProducts,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case FETCH_KIDS_PRODUCT_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const discountProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DISCOUNTED_PRODUCT_REQUEST:
            return { loading: true };
        case FETCH_DISCOUNTED_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.discountedProduct,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case FETCH_DISCOUNTED_PRODUCT_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const latestProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case FETCH_LATEST_PRODUCT_REQUEST:
            return { loading: true, products: [] };
        case FETCH_LATEST_PRODUCT_SUCCESS:
            return { loading: false, latestProducts: action.payload };
        case FETCH_LATEST_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productsYouMayLikeReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCTS_YOU_MAY_LIKE_REQUEST:
            return { laoding: true };
        case PRODUCTS_YOU_MAY_LIKE_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case PRODUCTS_YOU_MAY_LIKE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
