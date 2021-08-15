import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(
        (x) => x.product === item.product && x.size === item.size,
      )

      // if item exist
      if (existItem) {
        // If they are of different size
        if (item.size !== existItem.size) {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        } else {
          // if they are the same size, just update the quantity
          item.qty += existItem.qty
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x,
            ),
          }
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    default:
      return state
  }
}
