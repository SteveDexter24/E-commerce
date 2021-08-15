import product from '../apis/api'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types'

export const addToCart = (productId, qty, sizeType) => async (
  dispatch,
  getState,
) => {
  const { data } = await product.get(`/product/${productId}`)

  const size = data.size.filter((s) => s.sizeType === sizeType)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.productName[getState().settings.language],
      image: data.image,
      price: data.price[getState().settings.currency],
      size: size ? size[0].sizeType : sizeType,
      qty: qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
