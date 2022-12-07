import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist, showName = false }) => {
  return (
    <div key={artist._id}>
      <Link to={`/artist/${artist._id}`}>
        {showName && (
          <p className="name-of-artist-all-artists-page">{artist.name}</p>
        )}
        <img
          className="artists-images-all-artists-page"
          src={artist.picture}
          alt={artist.name}
        />
      </Link>
    </div>
  );
};

export default ArtistCard;
