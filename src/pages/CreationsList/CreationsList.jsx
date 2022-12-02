import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./CreationsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";

const CreationsList = ({
  creations,
  searchCreationString,
  setSearchCreationString,
}) => {
  const displayedCreations = creations.filter((creationEl) => {
    return creationEl.title.toLowerCase().includes(searchCreationString);
  });

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
      <div className="all-creations-page">
        {displayedCreations.map((element) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CreationsList;
