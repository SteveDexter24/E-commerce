import React from "react";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

export const CardComponent = ({ history, link, title, text, buttonName }) => {
    return (
        <Card className="text-white" border="light">
            <Card.Img
                src="/images/hk.jpeg"
                alt="Image"
                height={600}
                style={{ objectFit: "cover" }}
            />
            <Card.ImgOverlay>
                <Card.Body>
                    <Card.Title as="h1" style={{ fontSize: "2rem" }}>
                        {title}
                    </Card.Title>
                    <Card.Text
                        as="h4"
                        className="d-flex justify-content-center"
                    >
                        {text}
                    </Card.Text>
                </Card.Body>
                <div
                    className="d-flex justify-content-center"
                    style={{ position: "relative", top: "48%" }}
                >
                    <Button
                        className="btn-lg"
                        variant="success"
                        onClick={() => history.push(link)}
                    >
                        <strong>{buttonName}</strong>
                    </Button>
                </div>
            </Card.ImgOverlay>
        </Card>
    );
};

export const ProductsCardComponent = ({ item, height }) => {
    return (
        <Card style={{ border: "none", borderRadius: "5px" }}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
                <Card.Img
                    variant="top"
                    src={item.image}
                    height={height}
                    style={{ objectFit: "cover" }}
                />
                <Card.Body>
                    <Card.Title className="text-success d-flex justify-content-center">
                        <strong>{item.title}</strong>
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
};

export const cardArr = [
    {
        title: "Men Clothes",
        link: "/men",
        image: "/images/men_product.webp",
    },
    {
        title: "Women Clothes",
        link: "/women",
        image: "/images/women_product.jpeg",
    },
    {
        title: "Kids Clothes",
        link: "/kids",
        image: "/images/kids_product.png",
    },
];
export const socialHandles = [
    {
        title: "Contact Us",
        image: "/images/contact_us.png",
        link: "",
    },
    {
        title: "Facebook",
        image: "/images/fb.png",
        link: "www.facebook.com",
    },
    {
        title: "Instagram",
        image: "/images/ig.svg",
        link: "www.instagram.com",
    },
    {
        title: "About Us",
        image: "/images/about-us.jpeg",
        link: "/about-us",
    },
];
