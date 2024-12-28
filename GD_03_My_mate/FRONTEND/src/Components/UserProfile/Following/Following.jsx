import React from 'react';
import { Link } from 'react-router-dom';
import './Following.css'; // Assuming you have your styles in this file

const Following = ({ user }) => {
  return (
    <div className="following-container">
      <h1 className="following-title">Following</h1>
      {user.following && user.following.length > 0 ? (
        <ul className="following-list">
          {user.following.map((followedUser) => (
            <li key={followedUser._id} className="following-item">
              <Link to={`/user_profile/${followedUser._id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={followedUser.profilePic}
                  alt={followedUser.name}
                  className="following-avatar"
                />
                <p className="following-name">{followedUser.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-following">Not following anyone yet.</p>
      )}
    </div>
  );
};

export default Following;
