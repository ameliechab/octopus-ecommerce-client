import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const IsArtistRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser.isArtist) return <Outlet />;
  if (!currentUser.isArtist) return <Navigate to="/profile" />;
  else return <Outlet />;
};

export default IsArtistRoute;
