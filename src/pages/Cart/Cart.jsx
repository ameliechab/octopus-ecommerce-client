import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";

const Cart = ({ creations, orderCart, setOrderCart }) => {
  //Use effect to display the cart
  useEffect(() => {
    apiHandler.getOrderCart().then((res) => {
      console.log(res);
      setOrderCart(res);
    });
  }, []);

  console.log("tatita", [orderCart]);

  const handleIncrementCreation = async (event) => {
    document.querySelectorAll(".increment-button").forEach(async (button) => {
      event.preventDefault();
      const creationId = event.target.getAttribute("id");
      console.log(creationId);
      try {
        const orderIncremented = await apiHandler.patchIncrementCreationToOrder(
          creationId
        );
        setOrderCart(orderIncremented);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleDecrementCreation = async (event) => {
    document.querySelectorAll(".decrement-button").forEach(async (button) => {
      event.preventDefault();
      const creationId = event.target.getAttribute("id");
      console.log(creationId);
      try {
        const orderDecremented = await apiHandler.patchDecrementCreationToOrder(
          creationId
        );
        setOrderCart(orderDecremented);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleDeleteCart = async (event) => {
    event.preventDefault();
    try {
      const orderDeleted = await apiHandler.deleteCart();
      setOrderCart(orderDeleted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyCart = async (event) => {
    event.preventDefault();
    try {
      const orderCartBuy = await apiHandler.buyCart();
      console.log(orderCartBuy);
    } catch (error) {
      console.error(error);
    }
  };

  if (!orderCart?.creations) {
    return <div className="loading">You don't have any cart... yet !</div>;
  }

  const creationOfOrder = orderCart.creations;
  let creationAdded = {};

  //Handle event for the delete button of one creation
  const handleDeleteCreation = async (event) => {
    document
      .querySelectorAll(".trash-bin-creation-cart")
      .forEach(async (button) => {
        event.preventDefault();
        const productId = event.target.getAttribute("id");

        try {
          const updatedOrder = await apiHandler.deleteCreationCart(productId);
          setOrderCart(updatedOrder);
        } catch (error) {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <div>
        <button onClick={handleDeleteCart}> Delete the entire cart </button>
        <ul>
          {creationOfOrder.map((element) => {
            return (
              <>
                <li>
                  <img
                    src={
                      (creationAdded = creations.find(
                        (creation) => creation._id === element.productId
                      ).img)
                    }
                  />
                  <h3>
                    {
                      (creationAdded = creations.find(
                        (creation) => creation._id === element.productId
                      ).title)
                    }
                  </h3>
                  <h4>
                    Price:
                    {
                      (creationAdded = creations.find(
                        (creation) => creation._id === element.productId
                      ).price)
                    }
                    €
                  </h4>

                  <h4>Quantity: {element.quantity}</h4>
                  <div>
                    <button
                      className="decrement-button"
                      id={element.productId}
                      onClick={handleDecrementCreation}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <button
                      className="increment-button"
                      id={element.productId}
                      onClick={handleIncrementCreation}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <h5>Id: {element.productId}</h5>

                  <button className="trash-bin-creation-cart">
                    <img
                      onClick={handleDeleteCreation}
                      id={element.productId}
                      src="images/logos/trash-bin.png"
                    ></img>
                  </button>
                </li>
              </>
            );
          })}
        </ul>
        <button onClick={handleBuyCart}> BUY </button>
      </div>
    </div>
  );
};

export default Cart;
