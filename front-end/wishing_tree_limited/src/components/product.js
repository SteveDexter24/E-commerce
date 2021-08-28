import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

const Product = ({ product, lang, currency }) => {
  const [textColor, setTextColor] = useState('text-primary')

  const handleMouseOver = () => {
    setTextColor('')
  }
  const handleOnMouseOut = () => {
    setTextColor('text-primary')
  }
  return (
    <Card className="my-2 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image[0]}
          variant="top"
          height={400}
          width={400}
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Row>
          <Col md={8}>
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card.Title as="div">
                <strong
                  className={textColor}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleOnMouseOut}
                >
                  {product.productName[lang]}
                </strong>
              </Card.Title>
            </Link>
          </Col>
          <Col md={4}>
            <Card.Text
              as="h4"
              className=" d-flex align-items-center justify-content-end"
            >
              {currency === 'jpn' ? '¥' : '$'}
              {product.price[currency]}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Product
