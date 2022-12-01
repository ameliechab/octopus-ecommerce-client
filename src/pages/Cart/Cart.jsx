import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";

const Cart = ({ creations, orderCart, setOrderCart }) => {
  useEffect(() => {
    apiHandler.getOrderCart().then((res) => {
      console.log(res);
      setOrderCart(res);
    });
  }, []);

  console.log("tatita", [orderCart]);

  // console.log(Object.keys(orderCart));
  console.log(orderCart?.creations);
  if (!orderCart?.creations) {
    return <div className="loading">Loading...</div>;
  }

  // console.log("tototo", orderCart[0].creations);
  const creationOfOrder = orderCart.creations;
  let creationAdded = {};

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
                  {/* <Link to={`${element._id}`}>{element.name}</Link> */}
                  {/* <h3>{element.name}</h3>
          <div>{element.description}</div> */}
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
