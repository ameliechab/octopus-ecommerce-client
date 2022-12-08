import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./AllCreations.css";
import CreationCard from "../CreationCard/CreationCard";
import chooseRandom from "../../helper";

const AllCreations = () => {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      console.log(res);
      setCreations(res);
    });
  }, []);

  // Pick some random creations in the array of all creations

  const fiveRandomCreations = chooseRandom(creations, 5);

  // If there is no creation found
  if (!creations.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="creation-paragraph-title">CREATIONS</p>
      <div className="all-creations-home-page">
        {fiveRandomCreations.map((creation) => {
          return <CreationCard creation={creation} />;
        })}
        <div className="creations-images-view-more">
          <Link className="link-to-view-more" to="/creations">
            <button className="button-on-view-more">VIEW MORE</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default AllCreations;
