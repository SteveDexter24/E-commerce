import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from './types'
import orders from '../apis/api'

// Update user Info
export const createOrder = (cart, id) => async (dispatch, getState) => {
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
        id,
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
