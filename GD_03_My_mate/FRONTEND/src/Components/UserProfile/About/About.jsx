import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // if you're using react-router for routing
import './About.css';

const AboutPage = ({ user }) => {
  const [bio, setBio] = useState(user.bio);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const { userId } = useParams(); // to get userId from URL params if available

  const currentUserId = localStorage.getItem("userId"); // current logged-in user ID

  // Toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle bio change
  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  // Submit bio update
  const handleBioSubmit = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/edit/bio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setBio(updatedUser.user.bio);  // Update the bio displayed
        setIsEditing(false);  // Exit editing mode
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      alert('An error occurred while updating your bio.');
    }
  };

  useEffect(() => {
    setNewBio(bio);  // Reset the bio to the latest when user switches back from editing
  }, [bio]);

  // Check if the logged-in user is viewing their own profile
  const isCurrentUserProfile = currentUserId === (userId || user._id);

  return (
    <div className="about-page">
      <h2>About</h2>
      <p>{user.email}</p>
      
      {/* Bio Box */}
      <div className="bio-box">
        {isEditing ? (
          <div>
            <textarea
              value={newBio}
              onChange={handleBioChange}
              rows="5"
              placeholder="Update your bio"
            />
            <div className="button-group">
              <button onClick={handleBioSubmit}>Save</button>
              <button onClick={handleEditToggle} className="cancel">Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p>{bio}</p>
            {isCurrentUserProfile && (
              <button onClick={handleEditToggle} className="edit">Edit Bio</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
