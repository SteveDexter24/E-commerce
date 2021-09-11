import React, { useEffect, useRef } from "react";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/message";
import CheckoutSteps from "../components/checkoutSteps";
import { addDecimals } from "../Utils/addDecimals";
import { createOrder } from "../actions/order";
import { currencyDecoder } from "../Utils/currencyDecoder";
import { summary } from "../Utils/translateLibrary/orderSummary";

const PlaceOrderScreen = ({ history }) => {
    // Get states from redux
    // Cart Reducer
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress, paymentMethod, userShippingInfo } =
        cart;
    const { address1, address2, city, country } = shippingAddress;

    // Order Reducer
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    // Settings
    const settings = useSelector((state) => state.settings);
    const { currency, language } = settings;

    cart.itemsPrice = Number(
        addDecimals(
            cart.cartItems.reduce(
                (acc, curr) =>
                    curr.discount > 0
                        ? curr.discount * curr.qty + acc
                        : curr.price * curr.qty + acc,
                0
            )
        )
    );

    // useRef Hook for Recaptcha
    const reRef = useRef();

    // EDIT THE SHIPPING ARRANGEMENT
    cart.shippingCost = Number(addDecimals(100));
    cart.tax = Number(addDecimals(0));
    cart.totalPrice = Number(cart.itemsPrice + cart.shippingCost + cart.tax);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress || !userShippingInfo) {
            history.push("/shipping");
        }
        if (success) {
            setTimeout(() => {
                history.push(`/order/${order._id}`);
            }, 1500);
        }
    }, [
        dispatch,
        history,
        cart,
        success,
        shippingAddress,
        userShippingInfo,
        order,
    ]);

    // TO: EDIT THE CURRENCY
    const placeOrderHandler = async () => {
        const token = await reRef.current.executeAsync();
        reRef.current.reset();

        dispatch(
            createOrder(
                {
                    user: userShippingInfo,
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: paymentMethod,
                    shippingCost: cart.shippingCost,
                    tax: cart.tax,
                    totalPrice: cart.totalPrice,
                    itemsPrice: cart.itemsPrice,
                    currency: currencyDecoder(currency),
                },
                token
            )
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            {error && <Message variant="danger">{error}</Message>}
            {success && (
                <Message variant="success">
                    {"Shipping Information checks out! Proceed to payment"}
                </Message>
            )}
            <Row>
                <h1>{summary.title[language]}</h1>
                <Col md={9}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{summary.shipping[language]}</h2>
                            <p>
                                <strong>{summary.address[language]}:</strong>
                                {` ${address1}, ${address2}, ${city}, ${country}`}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{summary.payment[language]}</h2>
                            <strong>{summary.method[language]}: </strong>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{summary.orderItems[language]}</h2>
                            {cartItems.length === 0 ? (
                                <Message variant="danger">
                                    Your cart is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            cloudName="diqw1axjb"
                                                            publicId={
                                                                item.image[0]
                                                            }
                                                            alt={item.name}
                                                            width={50}
                                                            fluid
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Link
                                                            to={`/product/${item.productId}`}
                                                            className="text-primary"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={2}>
                                                        {summary.size[language]}
                                                        : {item.size}
                                                    </Col>
                                                    <Col md={2}>
                                                        {
                                                            summary.color[
                                                                language
                                                            ]
                                                        }
                                                        : {item.color}
                                                    </Col>
                                                    <Col md={2}>
                                                        {
                                                            summary.price[
                                                                language
                                                            ]
                                                        }
                                                        :{" "}
                                                        {currency === "hkd"
                                                            ? "$"
                                                            : "¥"}
                                                        {item.discount > 0
                                                            ? item.discount
                                                            : item.price}
                                                    </Col>
                                                    <Col md={1}>
                                                        x{item.qty}
                                                    </Col>
                                                    <Col md={2}>
                                                        = $
                                                        {item.discount > 0
                                                            ? item.discount *
                                                              item.qty
                                                            : item.price *
                                                              item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{summary.title[language]}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{summary.items[language]}</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{summary.shippingFee[language]}</Col>
                                    <Col>${cart.shippingCost}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{summary.tax[language]}</Col>
                                    <Col>${cart.tax}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{summary.total[language]}</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className="d-grid gap-2">
                                    <Button
                                        type="button"
                                        disabled={
                                            cartItems.length === 0 || success
                                        }
                                        onClick={placeOrderHandler}
                                    >
                                        {summary.pay[language]}
                                    </Button>
                                </span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
                size="invisible"
                ref={reRef}
            />
        </>
    );
};

export default PlaceOrderScreen;
