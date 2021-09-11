import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Image } from "cloudinary-react";
import Loader from "./loader";
import Message from "./message";
import { fetchLatestProducts } from "../actions/product";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    // Latest Product Reducer
    const latestProducts = useSelector((state) => state.latestProducts);
    const { loading, latestProducts: products, error } = latestProducts;

    // Settings Reducer
    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;
    useEffect(() => {
        // prevent re-rendering during pagination
        if (!products) {
            dispatch(fetchLatestProducts());
        }
    }, [dispatch, products]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : products ? (
        <Carousel
            pause="hover"
            className="bg-primary"
            indicators={false}
            // controls={false}
        >
            {products.map((product) => {
                return (
                    <Carousel.Item
                        key={product._id}
                        style={{ height: "500px" }}
                    >
                        <Link to={`/product/${product._id}`}>
                            <Image
                                className="d-block w-100"
                                cloudName="diqw1axjb"
                                publicId={product.image[0]}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                            <Carousel.Caption className="carousel-caption">
                                <h1>
                                    <strong>
                                        {product.productName[language]}{" "}
                                        {currency === "hkd" ? "HKD $" : "JPY ¥"}
                                        {product.price[currency]}
                                    </strong>
                                </h1>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    ) : (
        <></>
    );
};

export default ProductCarousel;
