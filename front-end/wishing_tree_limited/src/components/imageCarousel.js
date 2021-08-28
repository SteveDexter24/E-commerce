import React from "react";
import { Image, Row, Col } from "react-bootstrap";

const ImageCarousel = ({ images, colorIndexOnClick, carouselIndex }) => {
    const handleOnClick = (i) => {
        colorIndexOnClick(i);
    };

    return (
        <Row className="my-2" variant="secondary">
            {images.map((image, i) => {
                return (
                    <Col
                        xs={"auto"}
                        md={"auto"}
                        lg={"auto"}
                        xl={"auto"}
                        key={i}
                        onClick={() => handleOnClick(i)}
                    >
                        <Image
                            width={100}
                            height={100}
                            src={image}
                            alt=""
                            style={
                                carouselIndex === i
                                    ? {
                                          border: `2px solid black`,
                                          objectFit: "cover",
                                      }
                                    : { objectFit: "cover" }
                            }
                        />
                    </Col>
                );
            })}
        </Row>
    );
};

export default ImageCarousel;
