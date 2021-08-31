import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenProduct } from '../actions/product'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/loader'
import Message from '../components/message'
import Product from '../components/product'
import FilterComponent from '../components/filterComponent'
import SearchBox from '../components/searchBox'
import { Route } from 'react-router-dom'

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
      {/* Insert filter function */}
      {/* <SearchBox history={history}/> */}

      <Route render={({ history }) => <FilterComponent history={history} />} />
      {products ? (
        <>
          <Row className="py-4">
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
          {products.length === 0 && (
            <h2 className="d-flex align-items-center justify-content-center ">
              No Products found
            </h2>
          )}
        </>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
    </>
  )
}

export default MenScreen
