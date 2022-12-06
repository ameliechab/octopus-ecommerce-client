import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./CreationsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import NavSearchByCategory from "../../components/NavSearchByCategory/NavSearchByCategory";

const CreationsList = ({
  creations,
  searchCreationString,
  setSearchCreationString,
  searchCreationCategoryString,
  setSearchCreationCategoryString,
}) => {
  //To display creations filtered by name or by category
  const filteredCreations = () => {
    let creationsFiltered = [...creations];

    if (searchCreationString) {
      creationsFiltered = creationsFiltered.filter((element) =>
        element.title.toLowerCase().includes(searchCreationString.toLowerCase())
      );
    }
    if (searchCreationCategoryString) {
      creationsFiltered = creationsFiltered.filter((element) =>
        element.categories.includes(searchCreationCategoryString)
      );
    }
    return creationsFiltered;
  };

  return (
    <div className="middle-div-min">
      <NavSearch
        setSearchCreationString={setSearchCreationString}
        searchCreationString={searchCreationString}
      ></NavSearch>
      <NavSearchByCategory
        searchCreationCategoryString={searchCreationCategoryString}
        setSearchCreationCategoryString={setSearchCreationCategoryString}
        creations={creations}
      ></NavSearchByCategory>
      <div className="all-creations-page">
        {filteredCreations().map((element) => {
          return (
            <div key={element._id}>
              <Link to={`/creations/${element._id}`}>
                <p className="title-of-creation-all-creations-page">
                  {element.title}
                </p>
                <img
                  className="creations-images-all-creations"
                  src={element.img}
                  alt={element.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreationsList;
