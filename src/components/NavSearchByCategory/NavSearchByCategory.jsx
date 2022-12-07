import React from "react";
import { Link } from "react-router-dom";

const NavSearchByCategory = ({
  creations,
  searchCreationCategoryString,
  setSearchCreationCategoryString,
}) => {
  // To search creation by category
  const handleCreationCategorySearch = (e) => {
    console.log(e.target.value);
    setSearchCreationCategoryString(e.target.value);
  };

  // To clear the input when you are doing another research by category
  const clear = (event) => {
    event.target.value = "";
  };

  // Unique creation categories
  const creationCategories = [];
  for (let i = 0; i < creations.length; i++) {
    creationCategories.push(creations[i].categories[0]);
  }
  const uniqueCreationCategories = [...new Set(creationCategories)];

  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/creations">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1670414363/next_ysiu0b.png"
            alt="logo-search"
          ></img>{" "}
        </Link>

        <input
          className="search-navbar-input"
          value={searchCreationCategoryString}
          type="text"
          list="data"
          onClick={clear}
          onFocus={clear}
          placeholder="Search by category"
          onChange={handleCreationCategorySearch}
        />

        <datalist id="data">
          {uniqueCreationCategories.map((element) => (
            <option key={element} value={element} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default NavSearchByCategory;
