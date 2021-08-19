import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../actions/user'
import Loader from '../components/loader'
import Message from '../components/message'

const OrderHistoryScreen = ({ history }) => {
  // States: Get states from Redux Store
  const userAuth = useSelector((state) => state.userAuth)
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const { userInfo } = userAuth
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(getUserInfo(userInfo._id))
      }
    }
  }, [dispatch, userInfo, history])
  return (
    <div>
      <h1>YOUR ORDER HISTORY</h1>
      {user ? (
        <div>
          {user.orderHistory.length === 0
            ? 'No order history'
            : 'here are a list of your orders'}
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
