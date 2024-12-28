import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check for auth token

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
