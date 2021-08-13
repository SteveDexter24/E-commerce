import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/product";
import { connect } from "react-redux";
import { fetchAllProducts } from "../actions/product";

const HomeScreen = (props) => {
    useEffect(() => {
        props.fetchAllProducts();
    }, []);

    if (props.products) {
        return (
            <>
                <h1>Latest Products</h1>
                <Row>
                    {props.products.map((product, i) => {
                        return (
                            <Col key={i} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    } else {
        return <div></div>;
    }
};

const mapStateToProps = (state) => {
    return { products: state.productList.products };
};

export default connect(mapStateToProps, { fetchAllProducts })(HomeScreen);
