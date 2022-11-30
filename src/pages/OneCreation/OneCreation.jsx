import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OneCreation.css";

const OneCreation = ({ creations }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const oneCreation = creations.find((creation) => creation._id === id);
  console.log(oneCreation.artistId);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5005/api/order/:id/productId/add"
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setContent("");
    setUrgent(false);
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
