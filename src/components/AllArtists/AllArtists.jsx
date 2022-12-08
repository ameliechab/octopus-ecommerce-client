import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./AllArtists.css";
import ArtistCard from "../ArtistCard/ArtistCard";
import chooseRandom from "../../helper";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllArtists().then((res) => {
      console.log(res);
      setArtists(res);
    });
  }, []);

  // Pick some random artist in the array of all artists

  const threeRandomArtists = chooseRandom(artists, 3);

  console.log("tatatatatata", artists);
  // If there is no artist found
  if (!artists.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="artists-paragraph-title">ARTISTS & CREATORS</p>
      <div className="all-artists-home-page">
        {threeRandomArtists.map((artist) => {
          return <ArtistCard artist={artist} />;
        })}
        <div className="artists-images-view-more">
          <Link className="link-to-view-more" to="/artists">
            <button className="button-on-view-more"> VIEW MORE</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default AllArtists;
