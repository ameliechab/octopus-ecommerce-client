import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllArtists.css";
import ArtistCard from "../ArtistCard/ArtistCard";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllArtists().then((res) => {
      console.log(res);
      setArtists(res);
    });
  }, []);

  // Pick some random artist in the array of all artists
  const chooseRandom = (array, num = 10) => {
    const tenArtistsArray = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (tenArtistsArray.indexOf(array[randomIndex]) !== -1) {
        continue;
      }
      tenArtistsArray.push(array[randomIndex]);
    }
    return tenArtistsArray;
  };

  const sixRandomArtists = chooseRandom(artists, 10);

  if (!artists.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="artists-paragraph-title">ARTISTS & CREATORS</p>
      <div className="all-artists-home-page">
        {sixRandomArtists.map((artist) => {
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
