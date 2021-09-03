import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/product";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../actions/product";
import Loader from "../components/loader";
import Message from "../components/message";
import SearchBox from "../components/searchBox";
import { Route } from "react-router-dom";
import Paginate from "../components/paginate";
import ProductCarousel from "../components/productCarousel";
import { newArrival } from "../Utils/translateLibrary/newArrival";

const NewArrivalsScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const settings = useSelector((state) => state.settings);

    const { language, currency } = settings;
    const { loading, error, products, page, pages } = productList;

    const { loading: carouselLoaded } = useSelector(
        (state) => state.latestProducts
    );

    useEffect(() => {
        dispatch(fetchAllProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            {!keyword && <h1>{newArrival.title[language]}</h1>}
            {!keyword && <ProductCarousel />}
            {!keyword && (
                <h1 className="my-4">{newArrival.lastestProduct[language]}</h1>
            )}
            {keyword && <h1>{newArrival.search[language]}</h1>}

            {keyword && (
                <Route
                    render={({ history }) => (
                        <SearchBox
                            history={history}
                            placeholder="Search products by name, style or category"
                        />
                    )}
                />
            )}

            {products ? (
                <>
                    <Row>
                        {products.map((product, i) => {
                            return (
                                <Col key={i} sm={12} md={6} lg={4} xl={3}>
                                    <Product
                                        menu="new-arrivals"
                                        product={product}
                                        lang={language}
                                        currency={currency}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            ) : !carouselLoaded && loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default NewArrivalsScreen;
