import React from "react";
import { Link } from "react-router-dom";

const NavSearchByCategory = ({
  creations,
  searchCreationCategoryString,
  setSearchCreationCategoryString,
}) => {
  const handleCreationCategorySearch = (e) => {
    console.log(e.target.value);
    setSearchCreationCategoryString(e.target.value);
  };

  const newArray = []; // use a new empty array

  for (let i = 0; i < creations.length; i++) {
    newArray.push(creations[i].categories[0]); // push all the categories to this new empty array
  }

  const newArrayWithoutDuplicates = [...new Set(newArray)]; // remove the duplicates of the array

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
        {/* <input
          type="search"
          name="search-creation-categorie"
          className="search-creation-categorie"
          placeholder="Search for creation"
          value={searchStringInput} 
          type="text" 
          onChange={handleSearch}
        /> */}
        <input
          value={searchCreationCategoryString}
          type="text"
          list="data"
          placeholder="Search for creation by category"
          onChange={handleCreationCategorySearch}
        />
        <datalist id="data">
          {newArrayWithoutDuplicates.map((element) => (
            <option value={element} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default NavSearchByCategory;
