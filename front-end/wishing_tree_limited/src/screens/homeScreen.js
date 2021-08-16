import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../actions/product'
import Loader from '../components/loader'
import Message from '../components/message'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const settings = useSelector((state) => state.settings)
  const { language, country, currency } = settings
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {products ? (
        <Row>
          {products.map((product, i) => {
            return (
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <Product
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

export default HomeScreen
