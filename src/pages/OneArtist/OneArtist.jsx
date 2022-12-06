import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./OneArtist.css";

const OneArtist = () => {
  const [artist, setArtist] = useState([]);
  const [artistCreation, setArtistCreation] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  //const oneArtist = artists.find((artist) => artist._id === id);
  //console.log(oneArtist._id);
  //console.log(creations);
  //const creationsCopy = [...creations];

  useEffect(() => {
    apiHandler.getOneArtist(id).then((res) => {
      console.log(res);
      setArtist(res);
    });
    apiHandler.getArtistCreations(id).then((res) => {
      console.log(res);
      setArtistCreation(res);
    });
  }, []);

  if (!artist) {
    return <div className="middle-div-min">Loading...</div>;
  }

  if (!artistCreation) {
    return <div className="middle-div-min">Loading...</div>;
  }

  // const remainingObjects = creationsCopy.filter((El) => {
  //   console.log(El);
  //   return El.artistId == oneArtist._id;
  // });
  // console.log("totototo", remainingObjects);

  return (
    <div className="middle-div-min">
      <div className="artist-presentation">
        <img
          className="artist-picture"
          src={artist.picture}
          alt={artist.name}
        />
        <div className="artist-details">
          <h2 className="artist-details-name">{artist.name}</h2>
          <p className="artist-details-description">{artist.description}</p>
        </div>
      </div>

      <div className="object-of-artist-details">
        <h3 className="one-artist-creations">CREATIONS</h3>
        <div className="all-creations-artist-page">
          {artistCreation.map((element) => {
            return (
              <div key={element._id}>
                <Link
                  // className="creations-images-one-artist"
                  to={`/creations/${element._id}`}
                >
                  <img
                    className="creations-images-one-artist"
                    src={element.img}
                    alt={element.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OneArtist;
