import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/product";
import { getProductsYouMayLike } from "../../actions/product";
import Loader from "../../components/loader";
import Message from "../../components/message";
import { Row, Col } from "react-bootstrap";

const OtherProductInfo = ({ price, gender, pid }) => {
    // Redux State
    const productsYouMayLike = useSelector((state) => state.productsYouMayLike);
    const { products, error, loading } = productsYouMayLike;

    const settings = useSelector((state) => state.settings);
    const { currency, language } = settings;

    // Use Dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsYouMayLike(price, gender, pid));
    }, [dispatch, price, gender, pid]);
    return (
        <Row className="justify-content-md-center p-4">
            {products?.length > 0 && (
                <h4 className="p-4">Products you may like</h4>
            )}
            {products ? (
                <Row>
                    {products.map((product, i) => {
                        return (
                            <Col key={i} sm={12} md={6} lg={4} xl={3}>
                                <Product
                                    menu="products-you-may-like"
                                    product={product}
                                    lang={language}
                                    currency={currency}
                                />
                            </Col>
                        );
                    })}
                </Row>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </Row>
    );
};

export default OtherProductInfo;
