import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    
  const loggedIn = localStorage.getItem("jwtToken");

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
