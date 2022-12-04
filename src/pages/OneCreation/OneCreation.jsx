import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./OneCreation.css";

const OneCreation = ({ creations, artists, setCreations, setOrder }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const oneCreation = creations.find((creation) => creation._id === id);
  const artistsCopy = [...artists];

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      await apiHandler.postAddToCart(id);
      //setOrder((currentState) => [...currentState, data]);
    } catch (error) {
      console.error(error);
    }
    //setCreations({});
    navigate("/cart");
  };

  return (
    <div className="middle-div-min">
      <div className="all-object-details-page">
        <div className="creation-presentation">
          <img
            className="creation-picture"
            src={oneCreation.img}
            alt={oneCreation.title}
          />
          <div className="creation-details">
            <h2 className="creation-details-title">{oneCreation.title}</h2>
            <p className="creation-details-description">
              {oneCreation.description}
            </p>
            <h4>Categories: {oneCreation.categories}</h4>
          </div>
        </div>
        <div className="creation-price-and-button">
          <h3 className="creation-price">Price: {oneCreation.price} €</h3>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button-creation-page"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneCreation;
