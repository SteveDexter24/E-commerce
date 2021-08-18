import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
    return (
        <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Nav.Link>
                        <i className="fas fa-user" />
                        {` Profile`}
                    </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Nav.Link>
                        <i className="fas fa-history" />
                        Order History
                    </Nav.Link>
                </Link>
            </Nav.Item>
        </Nav>
    );
};

export default ProfileScreen;
