import React from "react";
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
                    style={{ height: "20rem", objectFit: "cover" }}
                    className="d-block w-100"
                    src="https://images5.alphacoders.com/666/thumb-1920-666436.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

const FilterComponent = () => {
    return (
        <>
            <Row className="g-2">
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <FloatingLabel label="Sort By">
                                <Form.Select aria-label="Sort">
                                    <option value="1">New Arrivals</option>
                                    <option value="2">
                                        Price (low to high)
                                    </option>
                                    <option value="3">
                                        Price (high to low)
                                    </option>
                                </Form.Select>
                            </FloatingLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FloatingLabel label="Select a category">
                                <Form.Select aria-label="Select a category">
                                    <option value="1">Shirt</option>
                                    <option value="2">Casual</option>
                                    <option value="3">Long Sleeves</option>
                                </Form.Select>
                            </FloatingLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FloatingLabel label="Select a color">
                                <Form.Select aria-label="Select a color">
                                    <option value="1">Yellow</option>
                                    <option value="2">Green</option>
                                    <option value="3">Blue</option>
                                </Form.Select>
                            </FloatingLabel>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className="my-3">
                                <i className="fas fa-sliders-h" />
                                {`  ${"Apply filter"}`}
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    <CarouselComponent />
                </Col>
            </Row>
        </>
    );
};

export default FilterComponent;
