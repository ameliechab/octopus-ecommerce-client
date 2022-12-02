import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./OneArtist.css";

const OneArtist = ({ artists, creations }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const oneArtist = artists.find((artist) => artist._id === id);
  console.log(oneArtist._id);
  console.log(creations);
  const creationsCopy = [...creations];

  const remainingObjects = creationsCopy.filter((El) => {
    return El.artistId.includes(oneArtist._id);
  });

  console.log("totototo", remainingObjects);

  return (
    <div className="middle-div-min">
      <div className="artist-presentation">
        <img
          className="artist-picture"
          src={oneArtist.picture}
          alt={oneArtist.name}
        />
        <div className="artist-details">
          <h2 className="artist-details-name">{oneArtist.name}</h2>
          <p className="artist-details-description">{oneArtist.description}</p>
        </div>
      </div>

      <div className="object-of-artist-details">
        <h3 className="one-artist-creations">CREATIONS</h3>
        <div className="all-creations-artist-page">
          {remainingObjects.map((element) => {
            return (
              <>
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
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OneArtist;
