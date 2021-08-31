import React from 'react'
import { Row, Col, Button, Image } from 'react-bootstrap'

const ShowNewImage = ({ source, handleRemoveImage }) => {
  return (
    <Row>
      {source.length > 0 &&
        source.map((source, index) => {
          return (
            <Col
              xs={12}
              s={12}
              md={12}
              lg={12}
              xl={12}
              key={index}
              className="p-2 d-flex align-items-center justify-content-center"
            >
              <Col
                className="d-flex align-items-center justify-content-end"
                md={11}
              >
                <Image
                  className="img-lg"
                  src={source}
                  width="400"
                  height="400"
                  style={{ objectFit: 'cover' }}
                />
              </Col>
              <Col
                md={1}
                className="m-1 d-flex align-items-center justify-content-end"
              >
                <Button
                  variant="danger btn-sm"
                  height="100px"
                  onClick={() => handleRemoveImage(index)}
                >
                  <i className="fas fa-times" />
                </Button>
              </Col>
            </Col>
          )
        })}
    </Row>
  )
}

export default ShowNewImage
