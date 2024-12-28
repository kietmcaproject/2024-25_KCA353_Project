import React from 'react';
import { NavLink } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
      <NavLink to="/feed" className="error-link">
        Go Back Home
      </NavLink>
    </div>
  );
};

export default Error;
