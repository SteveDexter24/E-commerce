import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/product";

const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product, i) => {
                    return (
                        <Col key={i} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default HomeScreen;
