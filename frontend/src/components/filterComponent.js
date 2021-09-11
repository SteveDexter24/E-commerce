import React, { useState } from "react";
import { Form, Row, FloatingLabel, Button, InputGroup } from "react-bootstrap";

// TODO: REDESIGN THE UI AND MAKE IT MODULAR
const FilterComponent = ({ history, type, p, pageNum, title }) => {
    const [sort, setSort] = useState(p?.sort ? p.sort : "new-arrivals");
    const [category, setCategory] = useState(p?.category ? p.category : "all");
    const [color, setColor] = useState(p?.color ? p.color : "all");
    const [priceFrom, setPriceFrom] = useState(
        p?.priceFrom ? p.priceFrom : "0"
    );
    const [priceTo, setPriceTo] = useState(p?.priceTo ? p.priceTo : "10000");

    const onSelectorHandler = () => {
        // TODO: history push to men with all the states and then get them via match in the men screen and dispatch the api request

        history.push(
            `/${type}/${sort}/${category}/${color}/${priceFrom}/${priceTo}/${
                pageNum ? pageNum : "0"
            }`
        );
    };

    const handleFilterReset = (e) => {
        e.preventDefault();

        setSort("new-arrivals");
        setCategory("all");
        setColor("all");
        setPriceFrom("0");
        setPriceTo("100000");

        history.push(`/${type}`);
    };

    const sortOnChangeHandler = (e) => {
        setSort(e.target.value);
    };

    const categoryOnChangeHandler = (e) => {
        setCategory(e.target.value);
    };

    const colorOnChangeHandler = (e) => {
        setColor(e.target.value);
    };

    const priceFromOnChangeHandler = (e) => {
        setPriceFrom(e.target.value);
    };

    const priceToOnChangeHandler = (e) => {
        setPriceTo(e.target.value);
    };

    return (
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
                        <option value="all">All Categories</option>
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
    );
};

export default FilterComponent;
