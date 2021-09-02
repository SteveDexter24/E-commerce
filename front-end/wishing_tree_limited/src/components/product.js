import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

const Product = ({ product, lang, currency, menu }) => {
  const [textColor, setTextColor] = useState('text-primary')

  const handleMouseOver = () => {
    setTextColor('')
  }
  const handleOnMouseOut = () => {
    setTextColor('text-primary')
  }
  return (
    <Card className="my-2 rounded" style={{ border: 'none' }}>
      <Link to={`/product/${product._id}/${menu}?`}>
        <Card style={{ border: 'none' }}>
          <Image
            style={{ objectFit: 'cover', border: 'none' }}
            cloudName="diqw1axjb"
            publicId={product.image[0]}
            height={400}
            alt=""
          />
        </Card>
      </Link>
      <Card.Body>
        <Row>
          <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <Link
              to={`/product/${product._id}/${menu}?`}
              style={{ textDecoration: 'none' }}
            >
              <Card.Title as="div" className="mr-2 d-flex align-items-center">
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
          <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Card.Text
              as="h5"
              className=" d-flex align-items-center justify-content-end"
            >
              {product.discount[currency] > 0 ? (
                <>
                  <del className="text-danger ml-2">
                    {currency === 'jpn' ? '¥' : '$'}
                    {product?.price[currency]}
                  </del>
                </>
              ) : (
                <>
                  {currency === 'jpn' ? '¥' : '$'}
                  {product?.price[currency]}
                </>
              )}

              {product?.discount[currency] > 0 ? (
                <div className="text-success ml-2">
                  {currency === 'jpn' ? ' ¥' : ' $'}
                  {product?.discount[currency]}{' '}
                </div>
              ) : null}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Product
