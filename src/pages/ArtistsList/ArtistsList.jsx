import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./ArtistsList.css";

const ArtistsList = ({ artists }) => {
  return (
    <div className="middle-div-min">
      <div className="all-artists-page">
        {artists.map((element) => {
          return (
            <>
              <Link to={`/artist/${element._id}`}>
                <p className="name-of-artist-all-artists-page">
                  {element.name}
                </p>
                <img
                  className="artists-images-all-artists-page"
                  src={element.picture}
                  alt={element.name}
                />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsList;
