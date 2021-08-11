import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/rating";
import products from "../products";

const ProductScreen = ({ match }) => {
    const product = products.find((p) => p._id === match.params.id);
    return (
        <>
            <Link className="btn my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    {/*flush takes out the border */}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-grid gap-2">
                                <Button
                                    className="btn"
                                    type="button"
                                    disabled={product.countInStock <= 0}
                                >
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
