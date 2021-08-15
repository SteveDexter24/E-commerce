import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})
