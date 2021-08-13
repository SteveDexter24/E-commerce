import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";

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

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(
                `http://localhost:3001/api/product/${match.params.id}`
            );
            setProduct(data);
            setIsLoaded(true);
        };
        fetchProduct();
    }, [match]);

    if (isLoaded) {
        return (
            <>
                <Link className="btn my-3" to="/">
                    Go Back
                </Link>
                <Row>
                    <Col md={6}>
                        <Image
                            src={product.image[0]}
                            alt={product.productName["en"]}
                            fluid
                            style={{ objectFit: "contain" }}
                        />
                    </Col>
                    <Col md={3}>
                        {/*flush takes out the border */}
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{product.productName["en"]}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <ButtonGroup>
                                    <Row>
                                        {product.size.map((s, i) => {
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
                                    value={product.ratings}
                                    text={`${product.ratings} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price["hkd"]}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.feature["en"]}
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
                                                ${product.price["hkd"]}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.size[selectedIndex]
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
                                            product.size[selectedIndex]
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

export default ProductScreen;
