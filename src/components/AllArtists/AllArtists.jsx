import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllArtists().then((data) => {
      console.log(data);
      setArtists(data);
    });
  }, []);

  if (!artists.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <ul>
        {artists.map((element) => {
          return (
            <li key={element._id}>
              <img src={element.picture} alt="" />
              <Link to={`${element._id}`}>{element.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllArtists;
