import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => {
          return (
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomeScreen
