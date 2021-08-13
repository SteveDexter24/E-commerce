import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProduct } from "../actions/product";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ButtonGroup,
} from "react-bootstrap";
import Rating from "../components/rating";

const styles = {
    btn_circle: {
        width: "30px",
        height: "30px",
        padding: "6px 0px",
        borderRadius: "15px",
        textAlign: "center",
        fontSize: "12px",
        lineHeight: "1.42857",
    },
};

const ProductScreen = (props) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        props.fetchProduct(props.match.params.id);
    }, [props.match]);

    if (props.product) {
        return (
            <>
                <Link className="btn my-3" to="/">
                    Go Back
                </Link>
                <Row>
                    <Col md={6}>
                        <Image
                            src={props.product.image[0]}
                            alt={props.product.productName["en"]}
                            fluid
                            style={{ objectFit: "contain" }}
                        />
                    </Col>
                    <Col md={3}>
                        {/*flush takes out the border */}
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{props.product.productName["en"]}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <ButtonGroup>
                                    <Row>
                                        {props.product.size.map((s, i) => {
                                            return (
                                                <Col
                                                    md={1}
                                                    className="mx-2 my-1"
                                                >
                                                    <Button
                                                        variant={
                                                            s.sizeType ===
                                                            selectedSize
                                                                ? "primary"
                                                                : "secondary"
                                                        }
                                                        style={
                                                            styles.btn_circle
                                                        }
                                                        onClick={() => {
                                                            setSelectedSize(
                                                                s.sizeType
                                                            );
                                                            setSelectedIndex(i);
                                                        }}
                                                    >
                                                        {s.sizeType}
                                                    </Button>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </ButtonGroup>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={props.product.ratings}
                                    text={`${props.product.ratings} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${props.product.price["hkd"]}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {props.product.feature["en"]}
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
                                            <strong>
                                                ${props.product.price["hkd"]}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {props.product.size[selectedIndex]
                                                .sizeRemaining > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button
                                        className="btn"
                                        type="button"
                                        disabled={
                                            props.product.size[selectedIndex]
                                                .sizeRemaining <= 0
                                        }
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
    } else {
        return <div></div>;
    }
};

const mapStateToProps = (state) => {
    return {
        product: state.product.product,
    };
};

export default connect(mapStateToProps, { fetchProduct })(ProductScreen);
