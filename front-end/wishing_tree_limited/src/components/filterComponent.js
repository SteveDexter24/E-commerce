import React, { useState } from "react";
import {
    Form,
    Row,
    Col,
    FloatingLabel,
    Button,
    Carousel,
    ListGroup,
} from "react-bootstrap";

const CarouselComponent = () => {
    return (
        <Carousel variant="light">
            <Carousel.Item>
                <Carousel.Caption>
                    <h2>
                        <strong>Men Fashion</strong>
                    </h2>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
                <img
                    style={{ height: "30rem", objectFit: "cover" }}
                    className="d-block w-100"
                    src="https://images5.alphacoders.com/666/thumb-1920-666436.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

const FilterComponent = () => {
    const [filterCount, setFilterCount] = useState(0);

    const onSelectorHandler = (e) => {
        e.preventDefault();
        const count = filterCount + 1;
        setFilterCount(count);
        console.log(filterCount);
    };
    return (
        <Form onSubmit={onSelectorHandler}>
            <Form.Group>
                <Row className="py-2 g-2">
                    <Col md>
                        <FloatingLabel label="Sort By">
                            <Form.Select aria-label="Sort" size="sm">
                                <option value="1">New Arrivals</option>
                                <option value="2">Price (low to high)</option>
                                <option value="3">Price (high to low)</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel label="Select a category">
                            <Form.Select
                                aria-label="Select a category"
                                size="sm"
                            >
                                <option value="1">Shirt</option>
                                <option value="2">Casual</option>
                                <option value="3">Long Sleeves</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel label="Select a color">
                            <Form.Select aria-label="Select a color" size="sm">
                                <option value="1">Yellow</option>
                                <option value="2">Green</option>
                                <option value="3">Blue</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col
                        md
                        className="d-flex align-items-center justifty-content-center"
                    >
                        <Row>
                            <Col>
                                <h5>Filters ({filterCount})</h5>
                            </Col>
                            <Col>
                                <Form.Check type="switch" id="custom-switch" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form.Group>
            <CarouselComponent />
        </Form>
    );
};

export default FilterComponent;
