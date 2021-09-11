import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { Image } from "cloudinary-react";

const Product = ({ product, lang, currency, menu }) => {
    const [textColor, setTextColor] = useState("text-primary");

    const handleMouseOver = () => {
        setTextColor("");
    };
    const handleOnMouseOut = () => {
        setTextColor("text-primary");
    };
    return (
        <Card className="m-2 rounded" style={{ border: "none" }}>
            <Link to={`/product/${product._id}/${menu}?`}>
                <Card style={{ border: "none" }}>
                    <Image
                        style={{ objectFit: "cover", border: "none" }}
                        cloudName="diqw1axjb"
                        publicId={product.image[0]}
                        height={400}
                        alt=""
                    />
                </Card>
            </Link>
            <Card.Body>
                <Row>
                    <Col>
                        <Link
                            to={`/product/${product._id}/${menu}?`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card.Title
                                as="div"
                                className="mr-2 d-flex align-items-center"
                            >
                                <strong
                                    className={textColor}
                                    onMouseOver={handleMouseOver}
                                    onMouseLeave={handleOnMouseOut}
                                >
                                    {product.productName[lang].substring(0, 15)}
                                </strong>
                            </Card.Title>
                        </Link>
                    </Col>

                    <Col>
                        <Card.Text
                            as="h5"
                            className=" d-flex align-items-center justify-content-end"
                        >
                            <Row>
                                {product.discount[currency] > 0 ? (
                                    <Col className="d-flex justify-content-end">
                                        <span className="strikediag withpadding text-danger ml-2">
                                            {currency === "jpn" ? "¥" : "$"}
                                            {product?.price[currency]}
                                        </span>
                                    </Col>
                                ) : (
                                    <Col className="d-flex ml-2 justify-content-end">
                                        {currency === "jpn" ? "¥" : "$"}
                                        {product?.price[currency]}
                                    </Col>
                                )}

                                {product?.discount[currency] > 0 ? (
                                    <Col className="d-flex text-success ml-2 justify-content-end">
                                        {currency === "jpn" ? " ¥" : " $"}
                                        {product?.discount[currency]}{" "}
                                    </Col>
                                ) : null}
                            </Row>
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Product;
