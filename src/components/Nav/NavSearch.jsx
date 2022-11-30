import "./NavSearch.css";
import { Link } from "react-router-dom";

const NavMain = () => {
  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/creations">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1669837342/search-white_ledj7c.png"
            alt="logo-search"
          ></img>{" "}
        </Link>
        <input
          type="search"
          name="search-creation-categorie"
          className="search-creation-categorie"
          placeholder="Search for creation"
        />
      </div>
    </div>
  );
};

export default NavMain;
