import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./ProfileOrders.css";

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      setOrders(res);
    });
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });
  }, []);

  console.log(orders);
  return (
    <div className="all-orders">
      <h3 className="your-orders-on-profile">Your orders :</h3>

      {orders.map((order) => {
        return (
          <div key={order._id} className="one-order">
            {order.creations.map((element) => {
              return (
                <div key={element._id}>
                  <p>
                    Date :{" "}
                    <span className="bold">{order.date.slice(0, 10)}</span>
                  </p>
                  <p className="bold">
                    {
                      creations.find(
                        (creation) => creation._id === element.productId
                      ).title
                    }
                  </p>
                  <p>
                    {" "}
                    Quantity: <span className="bold">{element.quantity}</span>
                  </p>
                </div>
              );
            })}
            <p>
              Total price:{" "}
              <span className="bold">
                {order.creations.reduce(
                  (total, element) =>
                    total +
                    creations.find(
                      (creation) => creation._id === element.productId
                    ).price *
                      element.quantity,
                  0
                )}
              </span>
              €
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileOrders;
