import React from 'react'
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'

const FilterComponent = () => {
  return (
    <>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Search Products">
            <Form.Control type="text" placeholder="Enter a product" />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="Select a category">
            <Form.Select aria-label="Select a category">
              <option>Category</option>
              <option value="1">Shirt</option>
              <option value="2">Casual</option>
              <option value="3">Long Sleeves</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <Form.Label className="">Price</Form.Label>
          <Form.Range />
        </Col>
      </Row>
    </>
  )
}

export default FilterComponent
