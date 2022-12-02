import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "./Profile.css";

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
      <h3 className="welcome-profile">Welcome to your profile!</h3>

      <div className="buttons-on-profile">
        <button className="button-on-profile">
          {" "}
          <Link to="/profile/orders">Your orders</Link>{" "}
        </button>
        <button className="button-on-profile">
          {" "}
          <Link to="/profile/artists/createartist">
            Create your creator page
          </Link>{" "}
        </button>
        <button className="button-on-profile">
          {" "}
          <Link to="/profile/artists/createobject">Create objects</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default Profile;
