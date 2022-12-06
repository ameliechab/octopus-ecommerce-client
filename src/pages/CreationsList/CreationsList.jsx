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
  const displayedCreations = creations.filter((creationEl) => {
    return creationEl.title
      .toLowerCase()
      .includes(searchCreationString.toLowerCase());
  });

  const displayedCreationsByCategory = creations.filter((creationEl) => {
    return creationEl.categories.includes(searchCreationCategoryString);
  });

  const filteredProdutcts = () => {
    let products = creations;

    if (searchCreationString) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchCreationString.toLowerCase())
      );
    }
    if (searchCreationCategoryString) {
      products = products.filter((product) =>
        product.categories.includes(searchCreationCategoryString)
      );
    }
    return products;
  };

  useEffect(() => {
    filteredProdutcts();
  }, []);

  return (
    <div className="middle-div-min">
      {/* <div>
        {displayedCreations.map((creationFiltered) => {
          return <h2>{creationFiltered.title}</h2>;
        })}
      </div> */}
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
        {filteredProdutcts().map((element) => {
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
        {/*         {displayedCreations.map((element) => {
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
        {displayedCreationsByCategory.map((element) => {
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
        })} */}
      </div>
    </div>
  );
};

export default CreationsList;
