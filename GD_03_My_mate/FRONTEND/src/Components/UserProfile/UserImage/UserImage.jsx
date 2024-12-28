import React, { useState } from "react";
import defaultProfile from "/user.jpg";
import "./UserImage.css";

const UserImage = ({ user }) => {
  const loggedInUserId = localStorage.getItem("userId"); // Get current logged-in user ID
  const [isFollowing, setIsFollowing] = useState(
    user.followers.some((follower) => follower._id === loggedInUserId)
  );

  // Handle Follow action
  const handleFollow = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/follow/${user._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setIsFollowing(true); // Update the button state
      } else {
        const error = await response.json();
        console.error("Error following user:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Unfollow action
  const handleUnfollow = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/unfollow/${user._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setIsFollowing(false); // Update the button state
      } else {
        const error = await response.json();
        console.error("Error unfollowing user:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="photo-viewer">
      <img
        src={user.profilePic || defaultProfile}
        style={{ width: "70%", borderRadius: "10%" }}
        alt="Profile"
      />
      <h3>{user.name}</h3>
      <h5>{user.email}</h5>

      {/* Show buttons only if loggedInUserId !== user._id */}
      {loggedInUserId !== user._id && (
        <>
          {isFollowing ? (
            <button className="btn btn-warning mt-1" onClick={handleUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className="btn btn-primary mt-1" onClick={handleFollow}>
              Follow
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserImage;
