import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./PostForm.css";

function PostForm({ onPostCreated }) {
  const [user, setUser] = useState({
    profilePhoto: "defaultProfilePhotoUrl.jpg",
    name: "Anonymous",
  });
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null); // Single file upload (optional)
  const [mediaPreview, setMediaPreview] = useState(null); // Preview of uploaded media
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user ID
  const navigate = useNavigate(); 

  // Fetch user data when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Get userId from localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Set the userId in state

      const fetchUser = async () => {
        setLoading(true);
        try {
          const authToken = localStorage.getItem("authToken");
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser/${storedUserId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          setUser({
            profilePhoto: response.data.user.profilePic || "defaultProfilePhotoUrl.jpg", 
            name: response.data.user.name || "Anonymous",
          });

        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      console.log("No userId found in localStorage");
    }
  }, []);

  // Navigate to user profile page
  const handleProfileClick = () => {
    if (userId) {
      navigate(`/user_profile/${userId}`);  // Navigate to the user's profile
    }
  };

  // Handle content change (post text)
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle media (image/video) selection
  const handleMediaChange = (e) => {
    const file = e.target.files[0]; // Only handle one file
    setMedia(file);

    // Generate preview for the selected media
    const preview = URL.createObjectURL(file);
    setMediaPreview(preview);
  };

  // Reset the form
  const resetForm = () => {
    setPostContent('');
    setMedia(null); 
    if (mediaPreview) URL.revokeObjectURL(mediaPreview); // Clean up preview memory
    setMediaPreview(null);
  };

  // Handle form submission (post creation)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);  // Always append the post content
    if (media) formData.append("post-pic", media); // Only append media if it exists

    setLoading(true);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData, // Sending the FormData containing content and possibly media
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);

      // Pass created post data to parent component (if onPostCreated is provided)
      if (onPostCreated) {
        onPostCreated(data);
      }

      // Reset form after successful post creation
      resetForm();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="post-form-container">
        {loading && <p>Loading...</p>} {/* Show loading text when submitting or fetching */}

        {/* User profile section */}
        <div className="post-author" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          <img src={user.profilePhoto} alt="Profile" className="profile-photo" />
          <h3>{user.name}</h3>
        </div>

        {/* Post form */}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={handleContentChange}
            className="post-content"
            required
          ></textarea>

          {/* File input for media upload */}
          <label className="media-upload">
            <input
              type="file"
              accept="image/*,video/*" // Allow images and videos
              name="post-pic"
              onChange={handleMediaChange}
            />
            <span>Upload Media (optional)</span>
          </label>

          {/* Display media preview if available */}
          {mediaPreview && (
            <div className="media-preview">
              <img src={mediaPreview} alt="Preview" />
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>

          {/* Discard button to reset form */}
          <button type="button" onClick={resetForm} className="discard-button">
            Discard
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
