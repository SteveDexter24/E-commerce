import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-light">
            <Container className="p-2">
                <Row className="d-flex justify-content-center text-primary">
                    <Col md="auto">
                        <h6>Use of cookies</h6>
                    </Col>
                    <Col md="auto">
                        <h6>Terms and Condition</h6>
                    </Col>
                    <Col md="auto">
                        <h6>Contact</h6>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
