import "./NavSearch.css";
import { Link } from "react-router-dom";

const NavSearch = ({ searchCreationString, setSearchCreationString }) => {
  // To search creation by name
  const handleCreationSearch = (event) => {
    setSearchCreationString(event.target.value);
  };

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
          value={searchCreationString}
          type="text"
          placeholder="Search by name"
          onChange={handleCreationSearch}
        />
      </div>
    </div>
  );
};

export default NavSearch;
