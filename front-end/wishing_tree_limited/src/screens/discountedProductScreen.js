import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountedProduct } from "../actions/product";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Product from "../components/product";
import FilterComponent from "../components/filterComponent";
import { Route } from "react-router-dom";
import { PaginateMenWomenKid } from "../components/paginate";

const DiscountedProductScreen = ({ history, match }) => {
    // Params
    const { sort, color, category, priceFrom, priceTo, pageNumber } =
        match.params;
    const num = pageNumber || 1;

    // Redux State
    const discountedProducts = useSelector((state) => state.discountedProducts);
    const { loading, products, error, page, pages } = discountedProducts;

    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getDiscountedProduct(sort, category, color, priceFrom, priceTo, num)
        );
    }, [dispatch, history, sort, category, color, priceFrom, priceTo, num]);

    return (
        <>
            <h1>All Discounted Products</h1>

            <Route
                render={({ history }) => (
                    <FilterComponent
                        history={history}
                        p={match.params}
                        num={num}
                        type="discount"
                        title="Discounted Products"
                    />
                )}
            />
            {products ? (
                <>
                    <Row className="py-4">
                        {products.map((product, i) => {
                            return (
                                <Col key={i} sm={12} md={6} lg={4} xl={3}>
                                    <Product
                                        menu="discount"
                                        product={product}
                                        lang={language}
                                        currency={currency}
                                    />
                                </Col>
                            );
                        })}
                    </Row>

                    {products.length === 0 && (
                        <h2 className="d-flex align-items-center justify-content-center ">
                            No Products found
                        </h2>
                    )}
                    <PaginateMenWomenKid
                        pages={pages}
                        page={page}
                        p={match.params}
                        type="discount"
                    />
                </>
            ) : loading ? (
                <div className="mt-4">
                    <Loader />
                </div>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default DiscountedProductScreen;
