import { combineReducers } from "redux";
import { productListReducer, fetchProduct } from "./productReducers";

export default combineReducers({
    productList: productListReducer,
    product: fetchProduct,
});
