import React from 'react';
import { NavLink } from 'react-router-dom';

const Logout = () => {
  return (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">You Have Been Logged Out</h1>
      <p className="text-gray-600 text-lg mb-10">Thank you for using CourseVote. See you again!</p>

      <div className="flex space-x-4">
        <NavLink to="/Signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300"
            aria-label="Go to Sign Up">Sign Up</button>
        </NavLink>

        <NavLink to="/Login">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
            aria-label="Go to Home">Log In</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Logout;
