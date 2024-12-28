import React from "react";
import "./ProfileSidebar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileSidebar = ({ setCurrentComponent }) => {
  const { logout } = useAuth0();

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
    <div className="profile-sidebar">
      <div className="sidebar-box">
        <ul>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("About")}
          >
            <div className="sidebar-item-box">
              <span>About</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("UserPost")}
          >
            <div className="sidebar-item-box">
              <span>Posts</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("Education")}
          >
            <div className="sidebar-item-box">
              <span>Education</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("Projects")}
          >
            <div className="sidebar-item-box">
              <span>Projects</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("WebLinks")}
          >
            <div className="sidebar-item-box">
              <span>Web Links</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("Followers")}
          >
            <div className="sidebar-item-box">
              <span>Followers</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("Followings")}
          >
            <div className="sidebar-item-box">
              <span>Followings</span>
            </div>
          </li>
          <li
            className="sidebar-item"
            onClick={() => setCurrentComponent("Followings")}
          >
            <div>
              <Link to="/" onClick={handleLogout}>
                <button className="btn btn-danger text-white">Logout</button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
