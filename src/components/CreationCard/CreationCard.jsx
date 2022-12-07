import React from "react";
import { Link } from "react-router-dom";

const CreationCard = ({ creation, showTitle = false }) => {
  return (
    <div key={creation._id}>
      <Link to={`/creations/${creation._id}`}>
        {showTitle && (
          <p className="title-of-creation-all-creations-page">
            {creation.title}
          </p>
        )}
        <img
          className="creations-images-all-creations"
          src={creation.img}
          alt={creation.title}
        />
      </Link>
    </div>
  );
};

export default CreationCard;
