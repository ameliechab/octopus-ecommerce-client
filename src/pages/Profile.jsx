import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";

const Profile = ({ creations }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      console.log(res);
      setOrders(res);
    });
  }, []);

  console.log("ORDERS", orders);

  return (
    <div>
      <p>Welcome to your profile!</p>

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
            <p>{order.date}</p>
          </>
        );
      })}
    </div>
  );
};

export default Profile;
