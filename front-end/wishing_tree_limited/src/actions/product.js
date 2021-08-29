import product from '../apis/api'
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
} from './types'
import { errorHandler } from '../Utils/errorHandling'
import { configUtil } from '../Utils/apiConfig'

// Fetch all products
export const fetchAllProducts = () => async (dispatch) => {
  const body = {
    category: 'shirt',
    gender: 'men',
    style: undefined,
  }
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await product.get(`/products`)
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
export const createProduct = (productObj) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const { data } = await product.post(
      `/product`,
      { ...productObj },
      configUtil(userInfo.token),
    )
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: errorHandler(error) })
  }
}

// Edit a product
export const editProduct = (productObj, productId) => async (
  dispatch,
  getState,
) => {
  const { userInfo } = getState().userAuth
  try {
    dispatch({ type: EDIT_PRODUCT_REQUEST })
    const { data } = await product.patch(
      `/product/${productId}`,
      { ...productObj },
      configUtil(userInfo.token),
    )
    dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: EDIT_PRODUCT_FAIL, payload: errorHandler(error) })
  }
}

// Delete a product
export const deleteProduct = (productId) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })
    await product.delete(`/product/${productId}`, configUtil(userInfo.token))
    dispatch({ type: DELETE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: errorHandler(error) })
  }
}
