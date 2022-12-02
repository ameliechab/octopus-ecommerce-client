import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./Cart.css";

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
    console.log("hello");
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
                <li className="each-creation-order">
                  <img
                    className="creation-image-order"
                    src={
                      (creationAdded = creations.find(
                        (creation) => creation._id === element.productId
                      ).img)
                    }
                  />
                  <div className="info-creation-order">
                    <h3>
                      {
                        (creationAdded = creations.find(
                          (creation) => creation._id === element.productId
                        ).title)
                      }
                    </h3>

                    <div className="quantity-creation-order">
                      <p>Quantity:</p>
                      <button
                        className="decrement-button"
                        id={element.productId}
                        onClick={handleDecrementCreation}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <h4>{element.quantity}</h4>
                      <button
                        className="increment-button"
                        id={element.productId}
                        onClick={handleIncrementCreation}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>

                    <h4>
                      {
                        (creationAdded =
                          creations.find(
                            (creation) => creation._id === element.productId
                          ).price * element.quantity)
                      }
                      €
                    </h4>
                  </div>

                  <div className="trash-bin-creation-cart-section">
                    <button className="trash-bin-creation-cart-button">
                      <img
                        onClick={handleDeleteCreation}
                        id={element.productId}
                        className="trash-bin-creation-cart"
                        src="images/logos/trash-bin.png"
                        alt="trashbin-image"
                      ></img>
                    </button>
                  </div>
                </li>
                <hr />
              </>
            );
          })}
        </ul>

        <h3>
          Total price:
          {creationOfOrder.reduce(
            (total, element) =>
              total +
              creations.find((creation) => creation._id === element.productId)
                .price *
                element.quantity,
            0
          )}
          €
        </h3>

        <button onClick={handleBuyCart}>
          {" "}
          <Link to="/order/validation">BUY</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default Cart;
