import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'
import { cartReducer } from './cartReducers'
import { changeSettingsReducer } from './settingsReducers'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  settings: changeSettingsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

export const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  settings: { language: 'en', country: 'hk', currency: 'hkd' },
}
