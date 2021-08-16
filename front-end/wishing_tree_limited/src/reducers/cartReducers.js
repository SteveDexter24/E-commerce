import {
    CART_ADD_ITEM,
    UPDATE_CART_ITEM,
    CART_REMOVE_ITEM,
} from "../actions/types";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(
                (x) =>
                    x.productId === item.productId &&
                    x.size === item.size &&
                    x.color === item.color
            );

            // If same productId and same size and same color, then append the quantity
            // else just add as a seperate product
            if (existItem) {
                const existIndex = state.cartItems.findIndex(
                    (x) =>
                        x.productId === existItem.productId &&
                        x.size === existItem.size &&
                        x.color === existItem.color
                );

                let cartList = [...state.cartItems];
                cartList[existIndex] = {
                    ...cartList[existIndex],
                    qty: Number(cartList[existIndex].qty) + Number(item.qty),
                };

                return {
                    ...state,
                    cartItems: cartList,
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case UPDATE_CART_ITEM:
            const updateItem = action.payload;
            if (state.cartItems[updateItem.cartIndex]) {
                let cartArr = [...state.cartItems];
                cartArr[updateItem.cartIndex] = {
                    ...cartArr[updateItem.cartIndex],
                    qty: Number(updateItem.qty),
                };
                return { ...state, cartItems: cartArr };
            } else {
                // return { ...state, cartItems: [...state.cartItems] }
                return { ...state };
            }
        case CART_REMOVE_ITEM:
            const removeItem = action.payload;
            const removeIndex = state.cartItems.findIndex(
                (x) =>
                    x.productId === removeItem.productId &&
                    x.size === removeItem.size &&
                    x.color === removeItem.color
            );

            if (removeIndex !== -1) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter(
                        (_, i) => i !== removeIndex
                    ),
                };
            } else {
                return { ...state };
            }

        default:
            return state;
    }
};
