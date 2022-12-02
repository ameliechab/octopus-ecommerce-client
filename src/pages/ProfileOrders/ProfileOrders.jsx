import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";

const ProfileOrders = ({ creations }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      console.log(res);
      setOrders(res);
    });
  }, []);

  return (
    <div>
      <p>Your orders :</p>

      {orders.map((order) => {
        return (
          <>
            <ul>
              {order.creations.map((element) => {
                return (
                  <>
                    <li>
                      <p>
                        Creation's name:
                        {
                          creations.find(
                            (creation) => creation._id === element.productId
                          ).title
                        }
                      </p>
                      <p>Quantity: {element.quantity}</p>
                    </li>
                  </>
                );
              })}
            </ul>
            <h5>
              Total price:
              {order.creations.reduce(
                (total, element) =>
                  total +
                  creations.find(
                    (creation) => creation._id === element.productId
                  ).price *
                    element.quantity,
                0
              )}
              €
            </h5>
            <p>{order.date}</p>
          </>
        );
      })}
    </div>
  );
};

export default ProfileOrders;
