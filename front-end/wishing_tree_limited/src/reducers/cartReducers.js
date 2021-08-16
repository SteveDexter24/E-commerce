import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/types";

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

            // TODO: If same productId and same size and same color, then append the quantity
            // else just add as a seperate product
            if (existItem) {
                // console.log(existItem);
                const qty_exist = existItem.qty;
                const existIndex = state.cartItems.findIndex(
                    (x) =>
                        x.productId === existItem.productId &&
                        x.size === existItem.size &&
                        x.color === existItem.color
                );

                let cartList = [...state.cartItems];
                cartList[existIndex] = {
                    ...cartList[existIndex],
                    qty: cartList[existIndex].qty + item.qty,
                };

                return {
                    ...state,
                    cartItems: cartList,
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        default:
            return state;
    }
};
