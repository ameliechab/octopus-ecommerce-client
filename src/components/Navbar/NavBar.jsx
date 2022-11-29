import React from "react";
import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="navbar-entire">
        <div className="navbar-left">
          <img
            className="logo-nav-bar"
            src="images/logos/octopus-logo-blanc.png"
            alt="logo-octopus"
          ></img>
        </div>
        <div className="navbar-center">
          <div className="artists-creations">
            <Link className="navbar-artist-creation-link">Artists</Link>
            <Link className="navbar-artist-creation-link">Creations</Link>
          </div>
          <div className="search-nav-bar">
            <input
              type="search"
              name="search-creation-categorie"
              className="search-creation-categorie"
              placeholder="Search for creation"
            />
          </div>
        </div>
        <div className="navbar-right">
          <Link className="navbar-login-register-link">Log In</Link>
          <Link className="navbar-login-register-link">Register</Link>
          <img
            className="card-logo-nav-bar"
            src="images/logos/shopping-cart-white.png"
            alt="logo-card"
          ></img>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
