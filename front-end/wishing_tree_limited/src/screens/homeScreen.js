import { style } from 'dom-helpers'
import React from 'react'
import { Row, Col, Image, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeScreen = ({ history }) => {
  return (
    <>
      <Carousel variant="dark" controls={false} indicators={false}>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            height={450}
            style={{ objectFit: 'cover' }}
            src="/images/hk.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <Button variant="success" rounded>
              <h5>New Arrivals</h5>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeScreen
