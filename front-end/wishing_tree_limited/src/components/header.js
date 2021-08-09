import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">
                        Wishing Tree Limited Online Shop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">
                                <i className="fas fa-shopping-cart" /> Cart
                            </Nav.Link>
                            <Nav.Link href="/">
                                <i className="fas fa-user" /> Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
