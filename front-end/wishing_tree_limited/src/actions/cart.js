import product from "../apis/api";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types";

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
    };
