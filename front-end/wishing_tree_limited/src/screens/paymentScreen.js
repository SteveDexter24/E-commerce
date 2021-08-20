import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutSteps from "../components/checkoutSteps";
import { savePaymentMethod } from "../actions/cart";
import { acceptablePaymentMethods } from "../Utils/payments";

const PaymentScreen = ({ history }) => {
    // Local states
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    // Get States from Redux
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress) {
            history.push("/shipping");
        }
    }, [dispatch, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(paymentMethod);
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler} autoComplete="on">
                <Form.Group controlId={"radio"} className="py-3">
                    <Form.Label as="legend" className="text-secondary">
                        Select Method
                    </Form.Label>
                    {acceptablePaymentMethods.map((payment) => {
                        return (
                            <Row key={`${payment.id}-payment`}>
                                <Col md={"auto"}>
                                    <Form.Check
                                        id={payment.id}
                                        type="radio"
                                        label={payment.label}
                                        value={payment.value}
                                        checked={
                                            payment.value === paymentMethod
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    ></Form.Check>
                                </Col>
                                <Col md={"auto"}>
                                    <i className={payment.imageClass} />
                                </Col>
                            </Row>
                        );
                    })}
                </Form.Group>

                <div className="py-3">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={paymentMethod === ""}
                    >
                        Continue
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
