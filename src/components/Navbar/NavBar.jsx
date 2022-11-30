import React from "react";
import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const NavBar = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
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
        <div id="navbar-center-responsive" className="navbar-center">
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
          {isLoggedIn && (
            <>
              <NavLink
                id="navbar-right-responsive"
                className="navbar-login-register-link"
                to="/profile"
              >
                {currentUser && currentUser.name}
              </NavLink>
              <button
                id="navbar-right-responsive"
                className="button-log-out-navbar"
                onClick={removeUser}
              >
                Log-Out
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                id="navbar-right-responsive"
                className="navbar-login-register-link"
                to="/signin"
              >
                Log in
              </NavLink>
              <NavLink
                id="navbar-right-responsive"
                className="navbar-login-register-link"
                to="/signup"
              >
                Register
              </NavLink>
            </>
          )}

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
