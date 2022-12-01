import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./OneCreation.css";

const OneCreation = ({ creations, setCreations, setOrder }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const oneCreation = creations.find((creation) => creation._id === id);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      await apiHandler.postAddToCart(id);
      //setOrder((currentState) => [...currentState, data]);
    } catch (error) {
      console.error(error);
    }

    //setCreations({});
  };

  return (
    <div>
      <img src={oneCreation.img} alt={oneCreation.title} />
      <h2>{oneCreation.title}</h2>
      <p>{oneCreation.description}</p>
      <h4>Categories: {oneCreation.categories}</h4>
      <h3>Price: {oneCreation.price} €</h3>
      <button
        onClick={handleAddToCart}
        className="add-to-cart-button-creation-page"
      >
        Add to cart
      </button>
    </div>
  );
};

export default OneCreation;
