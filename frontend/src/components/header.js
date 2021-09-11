import React from "react";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { nav } from "../Utils/translateLibrary/navbar";

const Header = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    const settings = useSelector((state) => state.settings);
    const { language } = settings;

    const handleLogout = (userId) => {
        dispatch(logout(userId));
    };

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>E-Commerce</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/new-arrivals">
                                <Nav.Link>{nav.new[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/men">
                                <Nav.Link>{nav.men[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/women">
                                <Nav.Link>{nav.women[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/kids">
                                <Nav.Link>{nav.kid[language]}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/discount">
                                <Nav.Link>{nav.sale[language]}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav className="ms-auto">
                            <LinkContainer to="/search">
                                <Nav.Link>
                                    <i className="fas fa-search" />
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" />{" "}
                                    {nav.cart[language]}
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/settings">
                                <Nav.Link>
                                    <i className="fas fa-cog"></i>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.username}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            {nav.profile[language]}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/orderhistory">
                                        <NavDropdown.Item>
                                            {nav.yourorder[language]}
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item
                                        onClick={() =>
                                            handleLogout(userInfo._id)
                                        }
                                    >
                                        {nav.logout[language]}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user" />{" "}
                                        {nav.signin[language]}
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.role === "admin" && (
                                <NavDropdown
                                    title={"Admin Actions"}
                                    id="adminmenu"
                                >
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            {nav.user[language]}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            {nav.product[language]}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            {nav.order[language]}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
