import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

const ImageCarousel = ({ images, colorIndexOnClick, carouselIndex }) => {
  const handleOnClick = (i) => {
    colorIndexOnClick(i)
  }

  return (
    <Row className="my-2" variant="secondary">
      {images.map((image, i) => {
        return (
          <Col
            xs={'auto'}
            md={'auto'}
            lg={'auto'}
            xl={'auto'}
            key={i}
            onClick={() => handleOnClick(i)}
          >
            <Image
              width={100}
              height={100}
              cloudName="diqw1axjb"
              publicId={image}
              style={
                carouselIndex === i
                  ? {
                      border: `2px solid black`,
                      objectFit: 'cover',
                    }
                  : { objectFit: 'cover' }
              }
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default ImageCarousel
