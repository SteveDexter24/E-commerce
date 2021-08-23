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
  ORDER_PAY_RESET,
  ORDER_SESSION_REQUEST,
  ORDER_SESSION_SUCCESS,
  ORDER_SESSION_FAIL,
} from './types'
import orders from '../apis/api'

// Place Order
export const createOrder = (cart) => async (dispatch, getState) => {
  const { userInfo } = getState().userAuth
  const { token } = userInfo
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await orders.post(
      `/order`,
      {
        cart,
      },
      config,
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await orders.get(`/order/${id}`, config)
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await orders.patch(
      `/order/${orderId}/pay`,
      paymentResult,
      config,
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await orders.post(
      `/order/${orderId}/create-checkout-session`,
      { line_items, email, payment_method_types, shippingCost, tax },
      config,
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
