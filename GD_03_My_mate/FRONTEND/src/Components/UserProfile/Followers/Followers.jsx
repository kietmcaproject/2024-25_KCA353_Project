import React from 'react';
import { Link } from 'react-router-dom';
import './Followers.css'; // Assuming you have your styles in this file

const Followers = ({ user }) => {
  return (
    <div className="followers-container">
      <h1 className="followers-title">Followers</h1>
      {user.followers && user.followers.length > 0 ? (
        <ul className="followers-list">
          {user.followers.map((follower) => (
            <li key={follower._id} className="follower-item">
              <Link to={`/user_profile/${follower._id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={follower.profilePic}
                  alt={follower.name}
                  className="follower-avatar"
                />
                <p className="follower-name">{follower.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-followers">No followers yet.</p>
      )}
    </div>
  );
};

export default Followers;
