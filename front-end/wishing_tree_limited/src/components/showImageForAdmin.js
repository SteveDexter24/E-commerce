import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

const ShowImageForAdmin = ({ source, handleRemoveImage, create }) => {
  return (
    <Row>
      {source.length > 0 &&
        source.map((source, index) => {
          return (
            <Col
              key={index}
              xs={12}
              s={12}
              md={12}
              lg={12}
              xl={12}
              className="p-2 d-flex align-items-center justify-content-center"
            >
              <Col
                className="d-flex align-items-center justify-content-end"
                md={11}
              >
                {create ? (
                  <Image
                    className="img-lg"
                    src={source}
                    width="400"
                    height="400"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Image
                    className="img-lg"
                    cloudName="diqw1axjb"
                    publicId={source}
                    width="400"
                    height="400"
                    style={{ objectFit: 'cover' }}
                  />
                )}
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

export default ShowImageForAdmin
