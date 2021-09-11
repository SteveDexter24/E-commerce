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
                <Card.Body style={{ height: "80%" }}>
                    <Card.Title
                        as="h1"
                        style={{
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            position: "relative",
                            top: "50%",
                        }}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {title}
                    </Card.Title>
                </Card.Body>
                <div
                    className="d-flex justify-content-center"
                    style={{ position: "relative", top: "4%" }}
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

const handleOnClick = (link) => {
    window.open(link);
};

export const ProductsCardComponent = ({ item, height }) => {
    return (
        <Card
            style={{ border: "none", borderRadius: "5px" }}
            onClick={() => item.atag && handleOnClick(item.link)}
        >
            <Link
                style={{ textDecoration: "none" }}
                to={item.atag === false && item.link}
            >
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
        link: "/contact-us",
        atag: false,
    },
    {
        title: "Facebook",
        image: "/images/fb.png",
        link: "https://www.facebook.com",
        atag: true,
    },
    {
        title: "Instagram",
        image: "/images/ig.svg",
        link: "https://www.instagram.com",
        atag: true,
    },
    {
        title: "About Us",
        image: "/images/about-us.jpeg",
        link: "/about-us",
        atag: false,
    },
];
