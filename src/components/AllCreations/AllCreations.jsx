import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./AllCreations.css";

const AllCreations = () => {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      console.log(res);
      setCreations(res);
    });
  }, []);

  if (!creations.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="all-creations-home-page">
        {creations.map((element) => {
          return (
            <>
              <Link
                className="creations-images-all-creations"
                to={`/creations/${element._id}`}
              >
                <img
                  className="creations-images-all-creations"
                  src={element.img}
                  alt={element.title}
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

export default AllCreations;
