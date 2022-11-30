import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./CreationsList.css";

const CreationsList = ({ creations }) => {
  return (
    <div>
      <div className="all-creations-page">
        {creations.map((element) => {
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
