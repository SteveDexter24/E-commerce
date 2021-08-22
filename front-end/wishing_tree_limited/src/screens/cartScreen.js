import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  FloatingLabel,
  OverlayTrigger,
  Tooltip,
  Button,
  Card,
} from 'react-bootstrap'
import Message from '../components/message'
import { addToCart, updateCart, removeItemInCart } from '../actions/cart'
import { sizeTypeToInfo } from '../Utils/size'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const params = location.search ? location.search.split('&') : ''

  const qty = params
    ? params[0].split('=')[1]
      ? Number(params[0].split('=')[1])
      : 1
    : ''
  const size = params ? params[1].split('=')[1] : ''
  const color = params ? params[2].split('=')[1] : ''

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size, color))
    }
  }, [dispatch, productId, qty, size, color])

  const removeFromCartHandler = (productId, size, color) => {
    dispatch(removeItemInCart(productId, size, color))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1>
        <p>
          <i className="fas fa-truck"></i>
          {` Orders over HKD $500 amount qualifies for
          free shipping`}
        </p>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => {
              return (
                <ListGroup.Item key={`${item.productId}cart${index}`}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image[0]}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.productId}`}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <strong className={'text-primary'}>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2}>Size: {sizeTypeToInfo(item.size)}</Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FloatingLabel label="Quantity">
                        <Form.Select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              updateCart(
                                item.productId,
                                Number(e.target.value),
                                item.size,
                                item.color,
                                index,
                                item.description,
                              ),
                            )
                          }
                        >
                          {[...Array(item.totalSize).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col md={1}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip">
                            {'remove from cart'}
                          </Tooltip>
                        }
                      >
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            removeFromCartHandler(
                              item.productId,
                              item.size,
                              item.color,
                            )
                          }
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 style={{ textAlign: 'center' }}>CHECKOUT NOW</h2>
              <Row>
                <Col md={8}>
                  SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) ITEMS
                </Col>
                <Col md={4} style={{ textAlign: 'right' }}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
              <Row>
                <Col md={6}>TOTAL</Col>
                <Col md={6} style={{ textAlign: 'right' }}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="d-grid gap-2">
                <Button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
