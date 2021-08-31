import React, { useState } from "react";
import {
    Form,
    Row,
    Col,
    FloatingLabel,
    Button,
    Carousel,
} from "react-bootstrap";

// Lastest 3 mens/women/kids product
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
                    style={{ height: "32rem", objectFit: "cover" }}
                    className="d-block w-100"
                    src="https://images5.alphacoders.com/666/thumb-1920-666436.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

// TODO: REDESIGN THE UI AND MAKE IT MODULAR
const FilterComponent = () => {
    const [filterCount, setFilterCount] = useState(0);

    const onSelectorHandler = (e) => {
        e.preventDefault();
        const count = filterCount + 1;
        setFilterCount(count);
        console.log(filterCount);
    };

    return (
        <Row>
            <Col md={9}>
                <CarouselComponent />
            </Col>
            <Col>
                <Form onSubmit={onSelectorHandler}>
                    <Form.Group>
                        <FloatingLabel label="Sort By" className="my-2">
                            <Form.Select aria-label="Sort" size="sm">
                                <option value="1">New Arrivals</option>
                                <option value="2">Price (low to high)</option>
                                <option value="3">Price (high to low)</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel
                            label="Select a category"
                            className="my-2"
                        >
                            <Form.Select
                                aria-label="Select a category"
                                size="sm"
                            >
                                <option value="1">Shirt</option>
                                <option value="2">Casual</option>
                                <option value="3">Long Sleeves</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Select a color" className="my-2">
                            <Form.Select aria-label="Select a color" size="sm">
                                <option value="1">Yellow</option>
                                <option value="2">Green</option>
                                <option value="3">Blue</option>
                            </Form.Select>
                        </FloatingLabel>

                        <Row className="d-flex align-items-center mx-1 my-2">
                            <Button>Apply Filter</Button>
                        </Row>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};

export default FilterComponent;
