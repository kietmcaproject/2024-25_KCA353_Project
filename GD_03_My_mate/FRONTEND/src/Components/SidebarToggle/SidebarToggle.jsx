import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./sidebarToggle.css";

const SidebarToggle = ({ isOpen, toggleSidebar }) => {
  const userId = localStorage.getItem("userId")
  const profile = `/user_profile/${userId}`



  const handleLogout = () => {
    // Clear localStorage data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");

    // Logout from Auth0 and redirect to home
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };



  return (
    <div className={`sidebarToggle ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <nav>
        <NavLink to="/feed" onClick={toggleSidebar}>
          <FaHome /> Feed
        </NavLink>
        <NavLink to={profile} onClick={toggleSidebar}>
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/settings" onClick={toggleSidebar}>
          <FaCog /> Settings
        </NavLink>
        <NavLink to={'/'} onClick={toggleSidebar}>
          <FaSignOutAlt /> <button className="btn btn-danger text-white" onClick={handleLogout}>Logout</button>
        </NavLink>
      </nav>
    </div>
  );
};

export default SidebarToggle;
