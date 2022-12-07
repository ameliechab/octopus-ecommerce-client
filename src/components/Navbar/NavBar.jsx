import React from "react";
import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const NavBar = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <>
      <div className="navbar-entire">
        <div className="navbar-left">
          <Link to="/">
            <img
              className="logo-nav-bar"
              src="https://res.cloudinary.com/dsioshcio/image/upload/v1669835655/octopus-logo-blanc_kgg3pw.png"
              alt="logo-octopus"
            ></img>
          </Link>
        </div>
        <div id="navbar-center-responsive" className="navbar-center">
          <div className="artists-creations">
            <Link to="/artists" className="navbar-artist-creation-link">
              All Artists
            </Link>
            <Link to="/creations" className="navbar-artist-creation-link">
              All Creations
            </Link>
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

          <Link to="/cart">
            <img
              className="card-logo-nav-bar"
              src="https://res.cloudinary.com/dsioshcio/image/upload/v1669836105/shopping-cart-white_fhx2z3.png"
              alt="logo-card"
            ></img>{" "}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
