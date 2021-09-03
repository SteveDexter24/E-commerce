import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKidsProduct } from "../actions/product";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Product from "../components/product";
import FilterComponent from "../components/filterComponent";
import { Route } from "react-router-dom";
import { PaginateMenWomenKid } from "../components/paginate";
import CardComponent from "../components/CardComponent";
import { kids } from "../Utils/translateLibrary/product";

const KidsScreen = ({ history, match }) => {
    const { sort, color, category, priceFrom, priceTo, pageNumber } =
        match.params;
    const num = pageNumber || 1;
    // Redux State
    const kidsProduct = useSelector((state) => state.kidsProduct);
    const { loading, products, error, page, pages } = kidsProduct;

    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getKidsProduct(sort, category, color, priceFrom, priceTo, num)
        );
    }, [dispatch, history, sort, category, color, priceFrom, priceTo, num]);

    return (
        <>
            <h1>{kids.all[language]}</h1>
            <Row>
                <Col md={8}>
                    <CardComponent
                        title="Kid's Fashion"
                        text="Check out our latest kid's fashion"
                    />
                </Col>
                <Col>
                    <Route
                        render={({ history }) => (
                            <FilterComponent
                                history={history}
                                p={match.params}
                                num={num}
                                type="kids"
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
                                        menu="kids"
                                        product={product}
                                        lang={language}
                                        currency={currency}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    {products.length === 0 && (
                        <h2 className="d-flex align-items-center justify-content-center">
                            No Products found
                        </h2>
                    )}
                    <PaginateMenWomenKid
                        pages={pages}
                        page={page}
                        p={match.params}
                        type="kids"
                    />
                </>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default KidsScreen;
