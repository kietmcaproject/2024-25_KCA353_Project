import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Network.css';

const Network = () => {
  const [allUser, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("userId"); // Get logged-in user ID from localStorage

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        // Update the state with the fetched users, excluding the logged-in user
        if (data.users) {
          const filteredUsers = data.users.filter(user => user._id !== loggedInUserId);
          setAllUsers(filteredUsers); // Set filtered users in the state
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, [loggedInUserId]); // Re-run when loggedInUserId changes

  const handleUserClick = (userId) => {
    navigate(`/user_profile/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Update search query
  };

  // Filter users based on the search query
  const filteredUsers = allUser.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="network">
      <h3>Meet the Network</h3>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-box"
      />

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map((user) => (
          <div key={user._id} className="network-user" onClick={() => handleUserClick(user._id)}>
            <img
              src={user.profilePic || '/default-avatar.png'}
              alt={user.name}
              className="network-avatar"
            />
            <div className="network-user-info">
              <span>{user.name}</span>
              <p className="network-user-details">
                Followers: {user.followers?.length || 0} <br />
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Network;
