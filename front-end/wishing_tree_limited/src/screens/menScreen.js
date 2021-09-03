import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenProduct } from "../actions/product";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Product from "../components/product";
import FilterComponent from "../components/filterComponent";
import { Route } from "react-router-dom";
import { PaginateMenWomenKid } from "../components/paginate";
import CardComponent from "../components/CardComponent";
import { men } from "../Utils/translateLibrary/product";

const MenScreen = ({ history, match }) => {
    // Params
    const { sort, color, category, priceFrom, priceTo, pageNumber } =
        match.params;
    const num = pageNumber || 1;

    // Redux State
    const menProduct = useSelector((state) => state.menProduct);
    const { loading, products, error, page, pages } = menProduct;

    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMenProduct(sort, category, color, priceFrom, priceTo, num));
    }, [dispatch, history, sort, category, color, priceFrom, priceTo, num]);

    return (
        <>
            <h1>{men.all[language]}</h1>

            <Row>
                <Col md={8}>
                    <CardComponent
                        title="Mens's Fashion"
                        text="Check out our lastest men's fashion"
                    />
                </Col>
                <Col>
                    <Route
                        render={({ history }) => (
                            <FilterComponent
                                history={history}
                                p={match.params}
                                num={num}
                                type="men"
                            />
                        )}
                    />
                </Col>
            </Row>

            {products ? (
                <>
                    <Row className="py-4">
                        {products.map((product, i) => {
                            return (
                                <Col key={i} sm={12} md={6} lg={4} xl={3}>
                                    <Product
                                        menu="men"
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
                        type="men"
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

export default MenScreen;
