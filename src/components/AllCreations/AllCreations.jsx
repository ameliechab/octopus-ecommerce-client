import React, { useState, useEffect } from "react";
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
              <img
                className="creations-images-all-creations"
                src={element.img}
                alt={element.title}
              />
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
