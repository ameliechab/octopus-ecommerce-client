import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./ArtistsList.css";

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllArtists().then((data) => {
      console.log(data);
      setArtists(data);
    });
  }, []);

  return (
    <div className="middle-div-min">
      <div className="all-artists-page">
        {artists.map((element) => {
          return (
            <div key={element._id}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsList;
