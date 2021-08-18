import React, { useState } from 'react'
import { Nav, Container, Row, Tabs, Tab } from 'react-bootstrap'
import EditProfile from '../screens/editProfile'
import { LinkContainer } from 'react-router-bootstrap'
import { Switch, Route, Link } from 'react-router-dom'

const renderSwitch = () => {
  return (
    <Switch>
      <Route exact path={'/profile'}>
        <EditProfile />
      </Route>
      <Route path={`/profile/orderhistory`}>
        <EditProfile />
      </Route>
    </Switch>
  )
}

const ProfileScreen = () => {
  const [navItemKey, setNavItemKey] = useState('1')

  const handleOnSelect = (eventKey) => {
    console.log(eventKey)
    setNavItemKey(eventKey)
  }

  return (
    <Container>
      <Row>
        <Nav
          variant="tabs"
          activeKey={navItemKey}
          className="justify-content-center"
          onSelect={handleOnSelect}
        >
          <Nav.Item className="mx-2">
            <LinkContainer to="/profile">
              <Nav.Link eventKey={'1'}>
                <i className="fas fa-user" />
                {`  User Profile`}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item className="mx-2">
            <LinkContainer to="/profile/orderhistory" className="primary">
              <Nav.Link eventKey={'2'}>
                <i className="fas fa-history" />
                {`   Your Order History`}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Row>
      <Row className="my-2">{renderSwitch()}</Row>
    </Container>
  )
}

export default ProfileScreen

/*
return (
    <Container>
      <Row>
        <Nav
          variant="tabs"
          activeKey={navItemKey}
          className="justify-content-center"
          onSelect={handleOnSelect}
        >
          <Nav.Item className="mx-2">
            <LinkContainer to="/profile">
              <Nav.Link eventKey={'1'}>
                <i className="fas fa-user" />
                {`  User Profile`}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item className="mx-2">
            <LinkContainer to="/profile/orderhistory" className="primary">
              <Nav.Link eventKey={'2'}>
                <i className="fas fa-history" />
                {`   Your Order History`}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Row>
      <Row className="my-2">{renderSwitch()}</Row>
    </Container>
  ) */
