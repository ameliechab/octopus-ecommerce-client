import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [creations, setCreations] = useState([]);
  const [orderCart, setOrderCart] = useState(null);

  //Use effect to display the cart
  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });
    apiHandler.getOrderCart().then((res) => {
      setOrderCart(res);
    });
  }, []);

  // Increment quantity of creation(s) in the cart
  const handleIncrementCreation = async (event) => {
    document.querySelectorAll(".increment-button").forEach(async (button) => {
      event.preventDefault();
      const creationId = event.target.getAttribute("id");
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

  // Decrement quantity of creation(s) in the cart

  const handleDecrementCreation = async (event) => {
    document.querySelectorAll(".decrement-button").forEach(async (button) => {
      event.preventDefault();
      const creationId = event.target.getAttribute("id");
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

  // Delete all the cart
  const handleDeleteCart = async (event) => {
    event.preventDefault();
    try {
      const orderDeleted = await apiHandler.deleteCart();
      setOrderCart(orderDeleted);
    } catch (error) {
      console.error(error);
    }
  };

  // Buy what you put on the cart (the cart become an order)
  const handleBuyCart = async (event) => {
    event.preventDefault();
    try {
      const orderCartBuy = await apiHandler.buyCart();
    } catch (error) {
      console.error(error);
    }
  };

  // if the cart is empty
  if (!orderCart?.creations) {
    return (
      <div className="middle-div-min">You don't have any cart... yet !</div>
    );
  }

  const creationOfOrder = orderCart.creations;

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
    <div className="middle-div-min">
      <div>
        <div className="creation-details-total-price-section">
          <ul className="all-creation-order">
            {/* Mapping through creations ordered to get creation details */}
            {creationOfOrder.map((element) => {
              return (
                <div key={element._id}>
                  <li className="each-creation-order">
                    <img
                      className="creation-image-order"
                      // To find the right creation in the array of creations by comparing the id of the creation in the array of order
                      src={
                        creations.find(
                          (creation) => creation._id === element.productId
                        ).img
                      }
                    />
                    <div className="info-creation-order">
                      <h4>
                        <div className="title-trashbin-order-section">
                          {
                            creations.find(
                              (creation) => creation._id === element.productId
                            ).title
                          }

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
                      </h4>

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

                      <h3>
                        {creations.find(
                          (creation) => creation._id === element.productId
                        ).price * element.quantity}
                        €
                      </h3>
                    </div>
                  </li>
                  <hr />
                </div>
              );
            })}
          </ul>

          <div className="order-summary-and-delete">
            <div>
              <button className="delete-all-cart" onClick={handleDeleteCart}>
                {" "}
                DELETE THE CART{" "}
              </button>
            </div>
            <div className="order-summary">
              <h3>ORDER SUMMARY</h3>
              <div className="total-price-order">
                <div>
                  <h4>TOTAL</h4>
                </div>
                <div>
                  {/* To get the total price of the order */}
                  {creationOfOrder.reduce(
                    (total, element) =>
                      total +
                      creations.find(
                        (creation) => creation._id === element.productId
                      ).price *
                        element.quantity,
                    0
                  )}
                  €
                </div>
              </div>
              <button className="button-to-buy" onClick={handleBuyCart}>
                {" "}
                <Link className="link-to-buy" to="/order/validation">
                  BUY
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
