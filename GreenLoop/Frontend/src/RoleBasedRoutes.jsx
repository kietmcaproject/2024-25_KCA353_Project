import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem('role'); // Retrieve the stored role

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if the user role is not allowed
  }

  return children;
};

export default RoleBasedRoute;
