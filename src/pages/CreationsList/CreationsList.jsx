import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./CreationsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import NavSearchByCategory from "../../components/NavSearchByCategory/NavSearchByCategory";
import CreationCard from "../../components/CreationCard/CreationCard";

const CreationsList = () => {
  const [creations, setCreations] = useState([]);
  const [searchCreationString, setSearchCreationString] = useState(""); // To search creation by name
  const [searchCreationCategoryString, setSearchCreationCategoryString] =
    useState(""); // To search creation by category

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      console.log("CREATIONS", res);
      setCreations(res);
    });
  }, []);

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
        {filteredCreations().map((creation) => {
          return <CreationCard creation={creation} showTitle={true} />;
        })}
      </div>
    </div>
  );
};

export default CreationsList;
