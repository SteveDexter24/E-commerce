import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../actions/product'
import Loader from '../components/loader'
import Message from '../components/message'
import SearchBox from '../components/searchBox'
import { Route } from 'react-router-dom'

const NewArrivalsScreen = ({ match }) => {
  //const keyword = match.params.keyword
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const settings = useSelector((state) => state.settings)
  const { language, currency } = settings
  const { loading, error, products } = productList

  const [ky, setKy] = useState('')

  useEffect(() => {
    dispatch(fetchAllProducts(ky))
  }, [dispatch])

  const searchSubmit = (e, keyword) => {
    e.preventDefault()
    setKy(keyword)
    dispatch(fetchAllProducts(keyword))
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Route
        render={({ history }) => (
          <SearchBox
            history={history}
            handleOnSubmit={(e, keyword) => searchSubmit(e, keyword)}
          />
        )}
      />
      {products ? (
        <Row>
          {products.map((product, i) => {
            return (
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <Product
                  menu="new-arrivals"
                  product={product}
                  lang={language}
                  currency={currency}
                />
              </Col>
            )
          })}
        </Row>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
    </>
  )
}

export default NewArrivalsScreen
