import product from '../apis/api'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from './types'
import { errorHandler } from '../Utils/errorHandling'
import { configUtil } from '../Utils/apiConfig'

// Fetch all products
export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await product.get('/products')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: errorHandler(error),
    })
  }
}

// Fetch a product
export const listProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST })
    const { data } = await product.get(`/product/${productId}`)
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: errorHandler(error),
    })
  }
}

// Create a product
export const createProduct = (productObj, token) => async (dispatch) => {
  const { data } = await product.post(
    `/product`,
    { ...productObj },
    configUtil(token),
  )

  dispatch({ type: CREATE_PRODUCT, payload: data })
}

// Edit a product
export const editProduct = (productObj, token, productId) => async (
  dispatch,
) => {
  const { data } = await product.patch(
    `/product/${productId}`,
    { ...productObj },
    configUtil(token),
  )
  dispatch({ type: EDIT_PRODUCT, payload: data })
}

export const deleteProduct = (productId, token) => async (dispatch) => {
  const { data } = await product.delete(
    `/product/${productId}`,
    configUtil(token),
  )
  dispatch({ type: DELETE_PRODUCT, payload: data })
}
