import { style } from "dom-helpers";
import React from "react";
import { Row, Col, Image, Button, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselComponent = ({ history }) => {
    return (
        <Carousel variant="dark" controls={false} indicators={false}>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    height={450}
                    style={{ objectFit: "cover" }}
                    src="/images/hk.jpeg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <Button variant="success" rounded>
                        <h5>New Arrivals</h5>
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

const HomeScreen = ({ history }) => {
    return (
        <>
            <Card className="bg-dark text-white">
                <Card.Img
                    src="/images/hk.jpeg"
                    alt="Image"
                    height={450}
                    style={{ objectFit: "cover" }}
                />
                <Card.ImgOverlay>
                    <Card.Title as="h1" style={{ fontSize: "2rem" }}>
                        Wishing Tree Limited
                    </Card.Title>
                    <Card.Text className="d-flex justify-content-center">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </>
    );
};

export default HomeScreen;
