import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './rating'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image[0]} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.productName.en}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          {/* <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    /> */}
        </Card.Text>
        <Card.Text as="h3">${product.price.hkd}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
