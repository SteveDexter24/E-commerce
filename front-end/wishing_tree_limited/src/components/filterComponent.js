import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  Carousel,
  InputGroup,
} from 'react-bootstrap'

// Lastest 3 mens/women/kids product
const CarouselComponent = () => {
  return (
    <Carousel variant="light">
      <Carousel.Item>
        <Carousel.Caption>
          <h2>
            <strong>Men Fashion</strong>
          </h2>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <img
          style={{ height: '32rem', objectFit: 'cover' }}
          className="d-block w-100"
          src="https://images5.alphacoders.com/666/thumb-1920-666436.jpg"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

// TODO: REDESIGN THE UI AND MAKE IT MODULAR
const FilterComponent = ({ history, men, women, p }) => {
  const [sort, setSort] = useState(p?.sort ? p?.sort : 'new-arrivals')
  const [category, setCategory] = useState(p?.category ? p?.category : 'Shirt')
  const [color, setColor] = useState(p?.color ? p?.color : 'all')
  const [priceFrom, setPriceFrom] = useState(p?.priceFrom ? p?.priceFrom : '0')
  const [priceTo, setPriceTo] = useState(p?.priceTo ? p?.priceTo : '100000')

  const onSelectorHandler = () => {
    // TODO: history push to men with all the states and then get them via match in the men screen and dispatch the api request

    if (men) {
      history.push(
        `/men/filter/${sort}/${category}/${color}/${priceFrom}/${priceTo}`,
      )
    }
    if (women) {
      history.push(
        `/women/filter/${sort}/${category}/${color}/${priceFrom}/${priceTo}`,
      )
    }
  }

  const handleFilterReset = (e) => {
    e.preventDefault()

    setSort('new-arrivals')
    setCategory('Shirt')
    setColor('all')
    setPriceFrom('0')
    setPriceTo('100000')
  }

  const sortOnChangeHandler = (e) => {
    setSort(e.target.value)
  }

  const categoryOnChangeHandler = (e) => {
    setCategory(e.target.value)
  }

  const colorOnChangeHandler = (e) => {
    setColor(e.target.value)
  }

  const priceFromOnChangeHandler = (e) => {
    setPriceFrom(e.target.value)
  }

  const priceToOnChangeHandler = (e) => {
    setPriceTo(e.target.value)
  }

  return (
    <Row>
      <Col md={9}>
        {/*Put this somewhere else*/}
        <CarouselComponent />
      </Col>
      <Col>
        <Form onSubmit={onSelectorHandler}>
          <Form.Group>
            <FloatingLabel label="Sort By" className="my-2">
              <Form.Select
                aria-label="Sort"
                size="sm"
                value={sort}
                onChange={(e) => sortOnChangeHandler(e)}
              >
                <option value="new-arrivals">New Arrivals</option>
                <option value="ascending">Price (low to high)</option>
                <option value="descending">Price (high to low)</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Select a category" className="my-2">
              <Form.Select
                aria-label="Select a category"
                size="sm"
                value={category}
                onChange={(e) => categoryOnChangeHandler(e)}
              >
                <option value="Shirt">Shirt</option>
                <option value="Casual">Casual</option>
                <option value="Long Sleeves">Long Sleeves</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Select a color" className="my-2">
              <Form.Select
                aria-label="Select a color"
                size="sm"
                value={color}
                onChange={(e) => colorOnChangeHandler(e)}
              >
                <option value="all">All Colors</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
              </Form.Select>
            </FloatingLabel>

            {/*Price from to */}
            <InputGroup className="mb-3">
              <InputGroup.Text>From $</InputGroup.Text>
              <Form.Control
                value={priceFrom}
                onChange={(e) => priceFromOnChangeHandler(e)}
              />
              <InputGroup.Text>to $</InputGroup.Text>
              <Form.Control
                value={priceTo}
                onChange={(e) => priceToOnChangeHandler(e)}
              />
            </InputGroup>

            <Row className="d-flex align-items-center mx-1 my-2">
              <Button type="submit">Apply Filter</Button>
            </Row>
            <Row className="d-flex align-items-center mx-1 my-2">
              <Button
                type="button"
                onClick={handleFilterReset}
                variant="danger"
              >
                Remove Filter
              </Button>
            </Row>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default FilterComponent
