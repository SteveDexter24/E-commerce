import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { register } from "../actions/user";

const FormComponent = ({ label, type, onChange, value, placeholder }) => {
    return (
        <Form.Group controlId={type} className="py-2">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            ></Form.Control>
        </Form.Group>
    );
};

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("en");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/";
    const dispatch = useDispatch();

    const userAuth = useSelector((state) => state.userAuth);
    const { loading, error, userInfo } = userAuth;

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo.token);
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, surname, username, email, password, language));
    };

    return (
        <FormContainer>
            <h1>SIGN IN</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormComponent
                    label="Email address"
                    type="email"
                    value={email}
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormComponent
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="py-3">
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </div>
            </Form>

            <Row className="py-3">
                <Col>
                    New customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;