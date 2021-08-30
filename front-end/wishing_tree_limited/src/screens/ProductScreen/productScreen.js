import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/product";
import Loader from "../../components/loader";
import Message from "../../components/message";
import SizeButtons from "./sizeButtons";
import ColorButtons from "./colorButtons";
import OtherProductInfo from "./otherProductInfo";
import ImageCarousel from "../../components/imageCarousel";
import PaymentMethods from "../../components/paymentMethods";
import ModalPopup from "../../components/modal";
import {
    Row,
    Col,
    ListGroup,
    Card,
    Button,
    Form,
    Carousel,
} from "react-bootstrap";
import { sizeTypeToInfo } from "../../Utils/size";

const styles = {
    btn_circle: {
        width: "30px",
        height: "30px",
        padding: "6px 0px",
        borderRadius: "15px",
        textAlign: "center",
        fontSize: "12px",
        lineHeight: "1.42857",
    },
};

const ProductScreen = ({ history, match }) => {
    const [selectedSize, setSelectedSize] = useState("None");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [color, setColor] = useState("None");

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(
            `/cart/${match.params.id}?qty=${qty}&size=${selectedSize}&=${color}`
        );
    };

    const setSizeAndSizeIndex = (s) => {
        setSelectedSize(s.size);
        setSelectedIndex(s.index);
    };

    const setColorButton = (c) => {
        setColorIndex(c.index);
        setColor(c.color);
    };

    const handleSelcetImage = (index) => {
        setImageIndex(index);
        setCarouselIndex(index);
    };

    return (
        <>
            <Link
                className="btn my-3"
                to={match.params.menu ? `/${match.params.menu}` : "/"}
            >
                Go Back
            </Link>
            {product ? (
                <>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={5}>
                            <Row>
                                <Carousel
                                    activeIndex={imageIndex}
                                    onSelect={handleSelcetImage}
                                    variant="dark"
                                >
                                    {product.image.map((im, i) => {
                                        return (
                                            <Carousel.Item
                                                key={i}
                                                style={{ height: "500px" }}
                                            >
                                                <img
                                                    className="d-block w-100"
                                                    src={im}
                                                    alt=""
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Carousel.Item>
                                        );
                                    })}
                                </Carousel>

                                <ImageCarousel
                                    images={product.image}
                                    colorIndexOnClick={handleSelcetImage}
                                    carouselIndex={carouselIndex}
                                />
                            </Row>
                        </Col>
                        <Col md={4} lg={5}>
                            <Card>
                                <ListGroup
                                    variant="flush"
                                    className="borderless"
                                >
                                    <ListGroup.Item variant="fluid">
                                        <h2>{product.productName[language]}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <SizeButtons
                                            product={product}
                                            styles={styles}
                                            buttonClick={setSizeAndSizeIndex}
                                            selectedSize={selectedSize}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <ColorButtons
                                            product={product}
                                            styles={styles}
                                            buttonClick={setColorButton}
                                            language={language}
                                            colors={color}
                                            selectedIndex={selectedIndex}
                                        />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {product.feature[language]}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    {currency === "hkd"
                                                        ? `$ ${product.price[currency]}`
                                                        : `¥ ${product.price[currency]}`}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.size[selectedIndex]
                                                    .colors[colorIndex] !==
                                                    undefined &&
                                                product.size[selectedIndex]
                                                    .colors[colorIndex].count >
                                                    0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.size[selectedIndex].colors[
                                        colorIndex
                                    ] !== undefined &&
                                        product.size[selectedIndex].colors[
                                            colorIndex
                                        ].count > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quanity</Col>
                                                    <Col>
                                                        <Form.Select
                                                            value={qty}
                                                            onChange={(e) => {
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product
                                                                        .size[
                                                                        selectedIndex
                                                                    ].colors[
                                                                        colorIndex
                                                                    ].count
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={
                                                                        x + 1
                                                                    }
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={7}>Selected Size:</Col>
                                            <Col md={5}>
                                                {sizeTypeToInfo(selectedSize)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={7}>Selected Color:</Col>
                                            <Col md={5}>{color}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-grid gap-2">
                                        <span className="d-grid gap-2">
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn"
                                                type="button"
                                                disabled={
                                                    product.size[selectedIndex]
                                                        .colors[colorIndex] ===
                                                        undefined ||
                                                    product.size[selectedIndex]
                                                        .colors[colorIndex]
                                                        .count <= 0 ||
                                                    color === "None" ||
                                                    selectedSize === "None"
                                                }
                                            >
                                                ADD TO CART
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col className="d-flex justify-content-center">
                                                <ModalPopup btnTitle="Size Guide" />
                                            </Col>
                                            <Col className="d-flex justify-content-center">
                                                <ModalPopup btnTitle="Delivery & Return" />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Acceptable Payment Methods
                                        <PaymentMethods />
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <OtherProductInfo product={product} />
                    </Row>
                </>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default ProductScreen;
