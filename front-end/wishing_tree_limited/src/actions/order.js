import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_SESSION_REQUEST,
  ORDER_SESSION_SUCCESS,
  ORDER_SESSION_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
} from './types'
import orders from '../apis/api'
import { configUtil } from '../Utils/apiConfig'

// Place Order
export const createOrder = (cart) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  const { token } = userInfo
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const { data } = await orders.post(
      `/order`,
      {
        cart,
      },
      configUtil(token),
    )
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  const { token } = userInfo
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const { data } = await orders.get(`/order/${id}`, configUtil(token))
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// For paypal
export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  const { userInfo } = getState().userAuth
  const { token } = userInfo
  try {
    dispatch({ type: ORDER_PAY_REQUEST })

    const { data } = await orders.patch(
      `/order/${orderId}/pay`,
      paymentResult,
      configUtil(token),
    )
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSessionCheckoutWithStripe = (
  line_items,
  email,
  payment_method_types,
  orderId,
  shippingCost,
  tax,
) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  const { token } = userInfo

  dispatch({ type: ORDER_SESSION_REQUEST })

  try {
    const { data } = await orders.post(
      `/order/${orderId}/create-checkout-session`,
      { line_items, email, payment_method_types, shippingCost, tax },
      configUtil(token),
    )

    dispatch({ type: ORDER_SESSION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_SESSION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Get user's orders
export const getUserOrders = () => async (dispatch, getState) => {
  const userAuth = getState().userAuth
  const { userInfo } = userAuth

  try {
    dispatch({ type: GET_USER_ORDER_REQUEST })
    const { data } = await orders.get(
      `/user/${userInfo._id}/orders`,
      configUtil(userInfo.token),
    )

    dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_USER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
