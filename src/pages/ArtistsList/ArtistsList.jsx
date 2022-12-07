import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./ArtistsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

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
        {filteredArtists().map((artist) => {
          return <ArtistCard artist={artist} showName={true} />;
        })}
      </div>
    </div>
  );
};

export default ArtistsList;
