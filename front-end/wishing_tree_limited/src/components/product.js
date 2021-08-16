import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product, lang, currency }) => {
  const [textColor, setTextColor] = useState('text-primary')

  const handleMouseOver = () => {
    setTextColor('')
  }
  const handleOnMouseOut = () => {
    setTextColor('text-primary')
  }
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image[0]} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
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

        <Card.Text as="div" className="text-secondary">
          {product.description[lang]}
        </Card.Text>
        <Card.Text as="h4">
          {currency === 'jpn' ? '¥' : '$'}
          {product.price[currency]}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
