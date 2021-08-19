import React from 'react'
import { logout } from '../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  const handleLogout = (userId) => {
    dispatch(logout(userId))
  }

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Wishing Tree Limited</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/new-arrivals">
              <Nav.Link>NEW ARRIVALS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mens">
              <Nav.Link>MEN</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/women">
              <Nav.Link>WOMEN</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Nav.Link>KIDS</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Your Orders</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={() => handleLogout(userInfo._id)}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
