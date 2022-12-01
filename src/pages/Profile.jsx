import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      console.log(res);
      setOrders(res);
    });
  }, []);

  return (
    <div>
      <p>Welcome to your profile!</p>

      <p>Your orders :</p>

      {orders.map((element) => {
        return (
          <>
            <p>{element.userId}</p>
            <p>{element.date}</p>
          </>
        );
      })}
    </div>
  );
};

export default Profile;
