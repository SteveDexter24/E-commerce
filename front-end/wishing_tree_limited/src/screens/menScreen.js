import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenProduct } from '../actions/product'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/loader'
import Message from '../components/message'
import Product from '../components/product'

const MenScreen = () => {
  const menProduct = useSelector((state) => state.menProduct)
  const { loading, products, error } = menProduct

  const settings = useSelector((state) => state.settings)
  const { language, currency } = settings

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMenProduct())
  }, [dispatch])

  return (
    <>
      <h1>All mens products</h1>
      {products ? (
        <Row>
          {products.map((product, i) => {
            return (
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <Product
                  menu="men"
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

export default MenScreen
