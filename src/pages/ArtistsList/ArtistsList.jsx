import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./ArtistsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);
  const [searchCreationString, setSearchCreationString] = useState(""); // To search creation by name

  useEffect(() => {
    apiHandler.getAllArtists().then((data) => {
      console.log(data);
      setArtists(data);
    });
  }, []);

  const filteredArtists = () => {
    let artistsFiltered = [...artists];
    if (searchCreationString) {
      artistsFiltered = artistsFiltered.filter((element) =>
        element.name.toLowerCase().includes(searchCreationString.toLowerCase())
      );
    }
    return artistsFiltered;
  };

  return (
    <div className="middle-div-min">
      <NavSearch
        setSearchCreationString={setSearchCreationString}
        searchCreationString={searchCreationString}
      ></NavSearch>
      <div className="all-artists-page">
        {filteredArtists().map((element) => {
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
