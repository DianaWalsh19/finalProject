import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = ({ user }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        style={{ marginBottom: 50 }}
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Link className="navbar-brand" to="/users/me">
                Astma App
              </Link>
              <Link className="nav-link" to="/readings">
                My Readings
              </Link>
              <Link className="nav-link" to="/readingsApi">
                Readings from API
              </Link>
              <NavLink className="nav-link" to="/graph">
                Graphic
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/users">
                    {user.email}
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <Link
                    to="/readings/new"
                    className="btn btn-primary"
                    style={{ marginLeft: 40 }}
                  >
                    New Reading
                  </Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
