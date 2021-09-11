import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Form,
    FloatingLabel,
    OverlayTrigger,
    Tooltip,
    Button,
    Card,
} from "react-bootstrap";
import { Image } from "cloudinary-react";
import Message from "../components/message";
import {
    addToCart,
    updateCart,
    removeItemInCart,
    addToCartDB,
    updateCartToDB,
    removeCartItemInDB,
} from "../actions/cart";
import { sizeTypeToInfo } from "../Utils/size";
import Loader from "../components/loader";
import { ORDER_CREATE_RESET } from "../actions/types";
import { c } from "../Utils/translateLibrary/cart";

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
    const { cartItems, cartLoading, cartError } = cart;

    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    // Settings Reducer
    const settings = useSelector((state) => state.settings);
    const { currency, language } = settings;

    useEffect(() => {
        if (productId) {
            if (userInfo) {
                // Get the cart in database and add the onces from local storage
                dispatch(addToCartDB(productId, qty, size, color));
            } else {
                dispatch(addToCart(productId, qty, size, color));
            }
        }
    }, [dispatch, history, productId, qty, size, color, userInfo]);

    const removeFromCartHandler = (productId, size, color) => {
        if (userInfo) {
            dispatch(removeCartItemInDB(productId, size, color));
        } else {
            dispatch(removeItemInCart(productId, size, color));
        }
    };

    const checkoutHandler = () => {
        // to make that the order state is reset
        dispatch({ type: ORDER_CREATE_RESET });
        history.push("/login?redirect=shipping");
    };

    const quantityOnChangeHandler = (e, item, index) => {
        if (userInfo) {
            dispatch(
                updateCartToDB(
                    item.productId,
                    Number(e.target.value),
                    item.size,
                    item.color,
                    index,
                    item.description
                )
            );
        } else {
            dispatch(
                updateCart(
                    item.productId,
                    Number(e.target.value),
                    item.size,
                    item.color,
                    index,
                    item.description
                )
            );
        }
    };

    const loaderStyle = {
        position: "absolute",
        top: "40%",
        left: "40%",
        zIndex: "4",
    };

    return (
        <Row>
            {cartError && <Loader />}
            <Col md={8}>
                <h1>{c.shoppingCart[language]}</h1>
                <p>
                    <i className="fas fa-truck"></i>
                    {` Orders over HKD $500 amount qualifies for
          free shipping`}
                </p>
                {cartItems.length === 0 ? (
                    <Message>
                        {c.emptyCart[language]}{" "}
                        <Link to="/">{c.goBack[language]}</Link>
                    </Message>
                ) : (
                    <ListGroup
                        variant="flush"
                        style={
                            cartLoading
                                ? { opacity: "0.4", backgroundColor: "grey" }
                                : null
                        }
                    >
                        {cartLoading && (
                            <div style={loaderStyle}>
                                <Loader />
                            </div>
                        )}
                        {cartItems &&
                            cartItems.map((item, index) => {
                                return (
                                    <ListGroup.Item
                                        key={`${item.productId}cart${index}`}
                                    >
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    cloudName="diqw1axjb"
                                                    publicId={item.image[0]}
                                                    width={100}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Link
                                                    to={`/product/${item.productId}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <strong
                                                        className={
                                                            "text-primary"
                                                        }
                                                    >
                                                        {item.name}
                                                    </strong>
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                Size:{" "}
                                                {sizeTypeToInfo(item.size)}
                                            </Col>
                                            <Col md={2}>
                                                $
                                                {item.discount > 0
                                                    ? item.discount
                                                    : item.price}
                                            </Col>
                                            <Col md={2}>
                                                <FloatingLabel label="Quantity">
                                                    <Form.Select
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            quantityOnChangeHandler(
                                                                e,
                                                                item,
                                                                index
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
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            <Col md={1}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="button-tooltip">
                                                            {"remove from cart"}
                                                        </Tooltip>
                                                    }
                                                >
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
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2 style={{ textAlign: "center" }}>
                                {c.checkoutNow[language]}
                            </h2>
                            <Row>
                                <Col md={8}>
                                    {c.subTotal[language]} (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) {c.items[language]}
                                </Col>
                                <Col md={4} style={{ textAlign: "right" }}>
                                    {currency === "hkd" ? "$" : "¥"}
                                    {/*If discount */}
                                    {cartItems[0]?.discount > 0
                                        ? cartItems
                                              .reduce(
                                                  (acc, item) =>
                                                      acc +
                                                      item.qty * item.discount,
                                                  0
                                              )
                                              .toFixed(2)
                                        : cartItems
                                              .reduce(
                                                  (acc, item) =>
                                                      acc +
                                                      item.qty * item.price,
                                                  0
                                              )
                                              .toFixed(2)}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>{c.total[language]}</Col>
                                <Col md={6} style={{ textAlign: "right" }}>
                                    {currency === "hkd" ? "$" : "¥"}
                                    {/*If discount */}
                                    {cartItems[0]?.discount > 0
                                        ? cartItems
                                              .reduce(
                                                  (acc, item) =>
                                                      acc +
                                                      item.qty * item.discount,
                                                  0
                                              )
                                              .toFixed(2)
                                        : cartItems
                                              .reduce(
                                                  (acc, item) =>
                                                      acc +
                                                      item.qty * item.price,
                                                  0
                                              )
                                              .toFixed(2)}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="d-grid gap-2">
                                <Button
                                    type="button"
                                    disabled={
                                        cartItems.length === 0 || cartLoading
                                    }
                                    onClick={checkoutHandler}
                                >
                                    {c.proceed[language]}
                                </Button>
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
