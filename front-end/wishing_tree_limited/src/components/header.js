import React from 'react'
import { logout } from '../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()

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

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/new-arrivals">
                <Nav.Link>NEW ARRIVALS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/men">
                <Nav.Link>{t('MEN')}</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/women">
                <Nav.Link>WOMEN</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/kids">
                <Nav.Link>KIDS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/discount">
                <Nav.Link>SALE</Nav.Link>
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
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>
                  <i className="fas fa-cog"></i>
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
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title={'Admin Actions'} id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
