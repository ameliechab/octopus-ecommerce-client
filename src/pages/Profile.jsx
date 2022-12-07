import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "./Profile.css";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();
  console.log({ currentUser });
  const [orders, setOrders] = useState([]);
  const [artists, setArtists] = useState([]);

  const artistPageExists = artists.filter((el) => el.user === currentUser._id);
  console.log(artistPageExists);

  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      console.log(res);
      setOrders(res);
    });
    apiHandler.getAllArtists().then((data) => {
      console.log(data);
      setArtists(data);
    });
  }, []);

  console.log("ORDERS", orders);

  return (
    <div className="middle-div-min">
      <h3 className="welcome-profile">Welcome to your profile!</h3>

      <div className="buttons-on-profile">
        <button className="button-on-profile">
          {" "}
          <Link to="/profile/orders">Your orders</Link>{" "}
        </button>
        {!currentUser.isArtist ? (
          ""
        ) : artistPageExists.length ? (
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/artists/updateartistpage">
              Update creator page
            </Link>{" "}
          </button>
        ) : (
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/artists/createartist">
              Create your creator page
            </Link>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
