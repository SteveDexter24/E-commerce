import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { changeSettingsReducer } from "./settingsReducers";
import {
    userAuthenticationReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdatePasswordReducer,
    userUpdateLanguageReducer,
    userListReducer,
    userDeleteReducer,
    userEditReducer,
} from "./userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    checkoutWithStripeReducer,
    getUserOrdersReducer,
} from "./orderReducers";

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    settings: changeSettingsReducer,
    userAuth: userAuthenticationReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    updateUserPassword: userUpdatePasswordReducer,
    updateUserLanguage: userUpdateLanguageReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    checkoutWithStripe: checkoutWithStripeReducer,
    userOrders: getUserOrdersReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const userShippingInfoFromStrage = localStorage.getItem("userShippingInfo")
    ? JSON.parse(localStorage.getItem("userShippingInfo"))
    : null;

const settingsFromStorage = localStorage.getItem("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : { language: "en", country: "hk", currency: "hkd" };

export const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
        userShippingInfo: userShippingInfoFromStrage,
    },
    settings: settingsFromStorage,
    userAuth: { userInfo: userInfoFromStorage },
};
