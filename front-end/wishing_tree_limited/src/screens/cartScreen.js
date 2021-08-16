import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/message";
import { addToCart } from "../actions/cart";
import { sizeTypeToInfo } from "../Utils/size";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const params = location.search ? location.search.split("&") : "";

    const qty = params
        ? params[0].split("=")[1]
            ? Number(params[0].split("=")[1])
            : 1
        : "";
    const size = params ? params[1].split("=")[1] : "";
    const color = params ? params[2].split("=")[1] : "";

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty, size, color));
        }
    }, [dispatch, productId, qty, size, color]);

    const removeFromCartHandler = (productId, size, color) => {
        console.log(productId, size, color);
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => {
                            return (
                                <ListGroup.Item key={`${item.productId}cart`}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image[0]}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link
                                                to={`/product/${item.productId}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            Size: {sizeTypeToInfo(item.size)}
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.productId,
                                                            Number(
                                                                e.target.value
                                                            ),
                                                            item.size,
                                                            item.color
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.totalSize
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.productId,
                                                        item.size,
                                                        item.color
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash" />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={2}></Col>
            <Col md={2}></Col>
        </Row>
    );
};

export default CartScreen;
