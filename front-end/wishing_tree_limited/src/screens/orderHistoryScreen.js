import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/order'
import Loader from '../components/loader'
import Message from '../components/message'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const OrderHistoryScreen = ({ history }) => {
  // States: Get states from Redux Store
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  const { loading, orders, error } = useSelector((state) => state.userOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserOrders())
    }
  }, [dispatch, userInfo, history])

  return (
    <div>
      <h1>YOUR ORDER HISTORY</h1>
      {orders ? (
        <div>
          {orders.length === 0 ? (
            'No order history'
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Order Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>#{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : 'Not delivered'}
                      </td>

                      <LinkContainer to={`/order/${order._id}`}>
                        <span className="d-grid gap-2">
                          <Button className="btn-sm">DETAILS</Button>
                        </span>
                      </LinkContainer>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </div>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
    </div>
  )
}

export default OrderHistoryScreen
