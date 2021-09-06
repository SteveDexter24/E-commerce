import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/message";
import Loader from "../components/loader";
import {
    getOrderDetails,
    createSessionCheckoutWithStripe,
    payOrder,
    deliverOrder,
} from "../actions/order";
import { addDecimals } from "../Utils/addDecimals";
import { paymentDecode } from "../Utils/paymentDecode";
// Handling Stripe
import { useStripe } from "@stripe/react-stripe-js";
// Handling Paypal orders
import paypalOrderScript from "../apis/api";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../actions/types";
import {
    currencyDecoder,
    stripeCurrencyDecoder,
} from "../Utils/currencyDecoder";
import { configUtil } from "../Utils/apiConfig";

const OrderScreen = ({ history, match }) => {
    const orderId = match.params.id;

    // State
    const [buttonLoading, setButtonLoading] = useState(false);
    const [stripeError, setStripeError] = useState(false);
    const [sdkReady, setSDKReady] = useState(false);

    // Get states from redux
    // Order Reducer
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    // Stripe Order Session
    const checkoutWithStripe = useSelector((state) => state.checkoutWithStripe);
    const { session, sessionId, sessionError } = checkoutWithStripe;

    // UserAuth Reducer
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    // Paypal reducer
    const orderPay = useSelector((state) => state.orderPay);
    const { paypalLoading, paypalSuccess } = orderPay;

    // Settings Reducer
    const settings = useSelector((state) => state.settings);
    const { currency, language } = settings;

    // Order Deliver Reducer
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const dispatch = useDispatch();
    const stripe = useStripe();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await paypalOrderScript.get(
                "/config/paypal",
                configUtil(userInfo.token)
            );

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=HKD`;
            script.async = true;
            script.onload = () => {
                setSDKReady(true);
            };
            document.body.appendChild(script);
        };

        if (order) {
            if (order._id !== orderId) {
                dispatch(getOrderDetails(orderId));
            }
        }

        if (!order || paypalSuccess || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSDKReady(true);
            }
        }

        if (!orderId) {
            history.push("/place-order");
        }
        if (!userInfo) {
            history.push("/login");
        }

        if (session) {
            setButtonLoading(true);
        }

        if (sessionError) {
            setButtonLoading(false);
        }
        if (sessionId) {
            const { error } = stripe.redirectToCheckout({
                sessionId,
            });
            if (error) {
                setStripeError(true);
            }
        }
    }, [
        dispatch,
        history,
        order,
        orderId,
        sessionId,
        session,
        userInfo,
        stripe,
        paypalSuccess,
        sessionError,
        successDeliver,
    ]);

    // added history and session error to the dependency array, if any bugs occure, remove these two

    // Paypal payment handler
    const paypalSuccessPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    // Stripe payment handler
    const placeOrderHandler = () => {
        const line_items = order.orderItems.map((item) => {
            return {
                price_data: {
                    currency: stripeCurrencyDecoder(currency),
                    product_data: {
                        name: item.name,
                        description: item.description
                            ? item.description
                            : "No description available",
                        images: item.image[0],
                    },
                    unit_amount:
                        currency === "hkd"
                            ? item.discount
                                ? item.discount * 100
                                : item.price * 100
                            : item.discount
                            ? item.discount * 100
                            : item.price * 1000,
                },
                quantity: item.qty,
            };
        });

        dispatch(
            createSessionCheckoutWithStripe(
                line_items,
                order.user.email,
                [paymentDecode(order.paymentMethod)],
                orderId,
                order.shippingCost,
                order.tax,
                stripeCurrencyDecoder(currency)
            )
        );
    };

    const deliverHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure?")) {
            dispatch(deliverOrder(order._id || orderId));
        }
    };

    return order ? (
        <>
            {stripeError && (
                <Message variant="danger">
                    Could not create Payment Session
                </Message>
            )}
            {sessionError && <Message variant="danger">{sessionError}</Message>}
            <h1>Order Number: #{order._id}</h1>
            <Row>
                <Col md={9}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Information</h2>
                            <p>
                                <strong>Name:</strong>
                                {` ${order.user.name} ${order.user.surname}`}
                            </p>
                            <p>
                                <strong>{"Email Address"}:</strong>
                                <a
                                    href={`mailto:${order.user.email}`}
                                >{` ${order.user.email}`}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {` ${order.shippingAddress.address1}, ${order.shippingAddress.address2}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">{`Delivered on ${order.deliveredAt.substring(
                                    0,
                                    10
                                )}`}</Message>
                            ) : (
                                <Message variant="danger">
                                    Not delieverd
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">{`Paid on ${order.paidAt.substring(
                                    0,
                                    10
                                )}`}</Message>
                            ) : (
                                <Message variant="danger">Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="danger">
                                    Your order seems to be empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            cloudName="diqw1axjb"
                                                            width={50}
                                                            publicId={
                                                                item.image[0]
                                                            }
                                                            alt={item.name}
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
                                                        Size: {item.size}
                                                    </Col>
                                                    <Col md={2}>
                                                        Color: {item.color}
                                                    </Col>
                                                    <Col md={2}>
                                                        Price: $
                                                        {item.discount > 0
                                                            ? item.discount
                                                            : item.price}
                                                    </Col>
                                                    <Col md={1}>
                                                        x{item.qty}
                                                    </Col>
                                                    <Col md={2}>
                                                        ={" "}
                                                        {currency === "hkd"
                                                            ? "$"
                                                            : " ¥"}
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
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${addDecimals(order.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${addDecimals(order.shippingCost)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${addDecimals(order.tax)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${addDecimals(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {!order.isPaid ? (
                                    <div>
                                        {order.paymentMethod === "PayPal" ? (
                                            <div>
                                                {paypalLoading && <Loader />}
                                                {!sdkReady ? (
                                                    <Loader />
                                                ) : (
                                                    <PayPalButton
                                                        amount={
                                                            order.totalPrice
                                                        }
                                                        currency={currencyDecoder(
                                                            currency
                                                        )}
                                                        onSuccess={
                                                            paypalSuccessPaymentHandler
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <span className="d-grid gap-2">
                                                <Button
                                                    type="button"
                                                    disabled={
                                                        order.orderItems
                                                            .length === 0 ||
                                                        order.isPaid ||
                                                        buttonLoading
                                                    }
                                                    onClick={placeOrderHandler}
                                                >
                                                    {"Proceed to Payment"}
                                                </Button>
                                            </span>
                                        )}
                                    </div>
                                ) : null}
                            </ListGroup.Item>
                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.role !== undefined &&
                                userInfo.role === "admin" &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <span
                                            className="d-grid gap-2"
                                            onClick={deliverHandler}
                                        >
                                            <Button type="button">
                                                Mark as delivered
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                )}
                            {userInfo && order.isPaid && order.isDelivered && (
                                <ListGroup.Item>
                                    <span className="d-grid gap-2">
                                        <Button
                                            type="button"
                                            variant="success"
                                            onClick={deliverHandler}
                                        >
                                            Mark as not Delivered
                                        </Button>
                                    </span>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    ) : loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <></>
    );
};

export default OrderScreen;
