import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { changeSettingsReducer } from "./settingsReducers";
import {
    userAuthenticationReducer,
    userRegisterReducer,
    userDetailsReducer,
    // userUpdateReducer,
} from "./userReducers";

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    settings: changeSettingsReducer,
    userAuth: userAuthenticationReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    // userUpdate: userUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    settings: { language: "en", country: "hk", currency: "hkd" },
    userAuth: { userInfo: userInfoFromStorage },
};
