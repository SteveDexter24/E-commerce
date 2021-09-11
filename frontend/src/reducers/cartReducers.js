import {
  CART_ADD_ITEM,
  UPDATE_CART_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_TO_DB_REQUEST,
  CART_REMOVE_ITEM_TO_DB_REQUEST,
  UPDATE_CART_ITEM_TO_DB_REQUEST,
  MOVE_CART_ITEM_TO_DB_REQUEST,
  CART_ADD_ITEM_TO_DB,
  CART_REMOVE_ITEM_TO_DB,
  UPDATE_CART_ITEM_TO_DB,
  MOVE_CART_ITEM_TO_DB,
  CART_ADD_ITEM_TO_DB_FAIL,
  CART_REMOVE_ITEM_TO_DB_FAIL,
  UPDATE_CART_ITEM_TO_DB_FAIL,
  MOVE_CART_ITEM_TO_DB_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_USER_SHIPPING_INFO,
} from '../actions/types'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  action,
) => {
  switch (action.type) {
    // Request
    case UPDATE_CART_ITEM_TO_DB_REQUEST:
      return { ...state, cartLoading: true }
    case CART_REMOVE_ITEM_TO_DB_REQUEST:
      return { ...state, cartLoading: true }
    case MOVE_CART_ITEM_TO_DB_REQUEST:
      return { ...state, cartLoading: true }
    case CART_ADD_ITEM_TO_DB_REQUEST:
      return { ...state, cartLoading: true }

    // success
    case CART_ADD_ITEM_TO_DB:
      return { ...state, cartLoading: false, cartItems: action.payload }
    case UPDATE_CART_ITEM_TO_DB:
      return { ...state, cartLoading: false, cartItems: action.payload }
    case CART_REMOVE_ITEM_TO_DB:
      return { ...state, cartLoading: false, cartItems: action.payload }
    case MOVE_CART_ITEM_TO_DB:
      return { ...state, cartLoading: false, cartItems: action.payload }

    // fail
    case CART_ADD_ITEM_TO_DB_FAIL:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
        cartItems: [],
      }
    case UPDATE_CART_ITEM_TO_DB_FAIL:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
        cartItems: [],
      }
    case CART_REMOVE_ITEM_TO_DB_FAIL:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
        cartItems: [],
      }
    case MOVE_CART_ITEM_TO_DB_FAIL:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
        cartItems: [],
      }

    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(
        (x) =>
          x.productId === item.productId &&
          x.size === item.size &&
          x.color === item.color,
      )

      // If same productId and same size and same color, then append the quantity
      // else just add as a seperate product
      if (existItem) {
        const existIndex = state.cartItems.findIndex(
          (x) =>
            x.productId === existItem.productId &&
            x.size === existItem.size &&
            x.color === existItem.color,
        )

        let cartList = [...state.cartItems]
        cartList[existIndex] = {
          ...cartList[existIndex],
          qty: Number(cartList[existIndex].qty) + Number(item.qty),
        }

        return {
          ...state,
          cartItems: cartList,
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case UPDATE_CART_ITEM:
      const updateItem = action.payload

      if (state.cartItems[updateItem.cartIndex]) {
        let cartArr = [...state.cartItems]
        cartArr[updateItem.cartIndex] = {
          ...cartArr[updateItem.cartIndex],
          qty: Number(updateItem.qty),
        }
        return { ...state, cartItems: cartArr }
      } else {
        // return { ...state, cartItems: [...state.cartItems] }
        return { ...state }
      }
    case CART_REMOVE_ITEM:
      const removeItem = action.payload
      const removeIndex = state.cartItems.findIndex(
        (x) =>
          x.productId === removeItem.productId &&
          x.size === removeItem.size &&
          x.color === removeItem.color,
      )

      if (removeIndex !== -1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((_, i) => i !== removeIndex),
        }
      } else {
        return { ...state }
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }
    case CART_SAVE_USER_SHIPPING_INFO:
      return { ...state, userShippingInfo: action.payload }
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }
    default:
      return state
  }
}
