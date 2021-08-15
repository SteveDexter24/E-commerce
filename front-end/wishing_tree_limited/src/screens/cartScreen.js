import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/message'
import { addToCart } from '../actions/cart'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const params = location.search ? location.search.split('&') : ''
  
  const qty = params[0].split('=')[1] ? Number(params[0].split('=')[1]) : 1
  const size = params[1].split('=')[1]

  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size))
    }
  }, [dispatch, productId, qty, size])

  return <div>Cart</div>
}

export default CartScreen
