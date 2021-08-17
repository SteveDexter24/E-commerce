import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const FormController = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormController
