import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./ProfileUpdateArtist.css";

const ProfileUpdateArtist = () => {
  const [myArtist, setMyArtist] = useState([]);

  useEffect(() => {
    const myArtist = apiHandler.getMyArtist().then((res) => {
      console.log(res);
      setMyArtist(res);
    });
  }, []);

  return (
    <div className="middle-div-min">
      <div className="artist-presentation">
        <img
          className="artist-picture"
          src={myArtist.picture}
          alt={myArtist.name}
        />
        <div className="artist-details">
          <h2 className="artist-details-name">{myArtist.name}</h2>
          <p className="artist-details-description">{myArtist.description}</p>
        </div>
      </div>

      {/* <div className="object-of-artist-details">
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
            ); */}
    </div>
  );
};

export default ProfileUpdateArtist;
