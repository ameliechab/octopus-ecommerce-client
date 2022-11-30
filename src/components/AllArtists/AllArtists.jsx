import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllArtists.css";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllArtists().then((res) => {
      console.log(res);
      setArtists(res);
    });
  }, []);

  if (!artists.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <p className="artists-paragraph-title">ARTISTS & CREATORS</p>
      <div className="all-artists-home-page">
        {artists.map((element) => {
          return (
            <>
              <Link to={`/artist/${element._id}`}>
                <img
                  className="artists-images-all-artists"
                  src={element.picture}
                  alt={element.name}
                />
              </Link>
              {/* <Link to={`${element._id}`}>{element.name}</Link> */}
              {/* <h3>{element.name}</h3>
              <div>{element.description}</div> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AllArtists;
