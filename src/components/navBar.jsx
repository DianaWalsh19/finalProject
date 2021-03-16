import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Astma App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/readings">
              My Readings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/graph">
              Graphic
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">
              My Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <Link
              to="/readings/new"
              className="btn btn-primary"
              style={{ marginLeft: 40 }}
            >
              New Reading
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/experiment"
              className="btn btn-danger"
              style={{ marginLeft: 500 }}
            >
              EXPERIMENT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
