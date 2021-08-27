import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET,
} from '../actions/types'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: action.payload }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { loading: true, ...state }
    case FETCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case FETCH_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return { loading: true }
    case EDIT_PRODUCT_SUCCESS:
      return { loading: false, success: action.payload }
    case EDIT_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case EDIT_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}
