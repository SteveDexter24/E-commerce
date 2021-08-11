import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  //const product = products.find((p) => p._id === match.params.id)

  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/product/${match.params.id}`,
      )
      setProduct(data)
      setIsLoaded(true)
      setIsLoading(false)
      console.log(data)
    }
    fetchProduct()
  }, [])

  if (isLoaded) {
    return (
      <>
        <Link className="btn my-3" to="/">
          Go Back
        </Link>
        <Row>
          <Col md={6}>
            <Image
              src={product.image[0]}
              alt={product.productName['en']}
              fluid
            />
          </Col>
          <Col md={3}>
            {/*flush takes out the border */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.productName['en']}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.ratings}
                  text={`${product.ratings} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price['hkd']}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.feature['en']}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price['hkd']}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product['extra_small'] > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid gap-2">
                  <Button
                    className="btn"
                    type="button"
                    disabled={product['extra_small'] <= 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  } else {
    return <div></div>
  }
}

export default ProductScreen
