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

  console.log("orderCart", orderCart);
  console.log(orderCart?.creations);

  if (!orderCart?.creations) {
    return <div className="loading">Loading...</div>;
  }

  const creationOfOrder = orderCart.creations;
  let creationAdded = {};

  //Handle event for the delete button
  const handleDelete = async (event) => {
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
                  <h5>Id: {element.productId}</h5>
                  <button className="trash-bin-creation-cart">
                    <img
                      onClick={handleDelete}
                      id={element.productId}
                      src="images/logos/trash-bin.png"
                    ></img>
                  </button>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
