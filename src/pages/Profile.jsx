import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

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
      <h3>Welcome to your profile!</h3>

      <Link to="/profile/orders">Your orders</Link>
    </div>
  );
};

export default Profile;
