import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = () => {
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
              <Link className="navbar-brand" to="/">
                Astma App
              </Link>
              <Link className="nav-link" to="/readings">
                My Readings
              </Link>
              <NavLink className="nav-link" to="/graph">
                Graphic
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <Link
                to="/readings/new"
                className="btn btn-primary"
                style={{ marginLeft: 40 }}
              >
                New Reading
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
