import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const EditProfileNavbar = (key) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        <LinkContainer to="/profile">
          <Nav.Link>Update User Info</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profile/change-password">
          <Nav.Link>Change Password</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profile/settings">
          <Nav.Link>Settings</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  )
}
export default EditProfileNavbar
