import React, { useState } from "react";
import {
    Form,
    Row,
    Col,
    FloatingLabel,
    Button,
    Carousel,
    InputGroup,
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
const FilterComponent = ({ history }) => {
    //const [filterCount, setFilterCount] = useState(0);
    const [sort, setSort] = useState("new-arrivals");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(100000);

    const onSelectorHandler = (e) => {
        e.preventDefault();
        // TODO: history push to men with all the states and then get them via match in the men screen and dispatch the api request

        console.log(sort, category, color, priceFrom, priceTo);
    };

    const handleFilterReset = (e) => {
        e.preventDefault();
        setSort("");
        setCategory("");
        setColor("");
        setPriceFrom(0);
        setPriceTo(100000);
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
                            <Form.Select
                                aria-label="Sort"
                                size="sm"
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="new-arrivals">
                                    New Arrivals
                                </option>
                                <option value="price-low-to-high">
                                    Price (low to high)
                                </option>
                                <option value="price-high-to-low">
                                    Price (high to low)
                                </option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel
                            label="Select a category"
                            className="my-2"
                        >
                            <Form.Select
                                aria-label="Select a category"
                                size="sm"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Shirt">Shirt</option>
                                <option value="Casual">Casual</option>
                                <option value="Long Sleeves">
                                    Long Sleeves
                                </option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Select a color" className="my-2">
                            <Form.Select
                                aria-label="Select a color"
                                size="sm"
                                onChange={(e) => setColor(e.target.value)}
                            >
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                            </Form.Select>
                        </FloatingLabel>

                        {/*Price from to */}
                        <InputGroup className="mb-3">
                            <InputGroup.Text>From $</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setPriceFrom(e.target.value)}
                            />
                            <InputGroup.Text>to $</InputGroup.Text>
                            <Form.Control
                                onChange={(e) => setPriceTo(e.target.value)}
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
    );
};

export default FilterComponent;
