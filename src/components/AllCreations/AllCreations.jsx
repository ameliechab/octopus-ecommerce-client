import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./AllCreations.css";
import CreationCard from "../CreationCard/CreationCard";

const AllCreations = () => {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      console.log(res);
      setCreations(res);
    });
  }, []);

  // Pick some random creation in the array of all creations
  const chooseRandom = (array, num) => {
    const tenCreationsArray = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (tenCreationsArray.indexOf(array[randomIndex]) !== -1) {
        //verify if there's no double artist
        continue;
      }
      tenCreationsArray.push(array[randomIndex]); //push (num times - double artist) in new array
    }
    return tenCreationsArray;
  };

  const tenRandomCreations = chooseRandom(creations, 15);

  // If there is no creation found
  if (!creations.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="creation-paragraph-title">CREATIONS</p>
      <div className="all-creations-home-page">
        {tenRandomCreations.map((creation) => {
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
