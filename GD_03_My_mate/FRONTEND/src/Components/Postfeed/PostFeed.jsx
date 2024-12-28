import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostFeed.css";
import CreatePost from "../CreatePost/PostForm";
import { FaHeart, FaShare, FaRegBookmark } from "react-icons/fa";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/feed`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        console.log(data);  // Log the response to verify the structure

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Unexpected data format:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Callback to add the new post to the top of the posts list
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Profile click handler to navigate to the user's profile page
  const handleProfileClick = (userId) => {
    navigate(`/user_profile/${userId}`);
  };

  // Like a post
  const handleLikePost = async (postId) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ postId, userId }),  // Ensure userId is passed correctly
      });

      const updatedPost = await response.json();

      if (updatedPost) {
        // Update only the like count
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? { ...post, likes: updatedPost.likes } : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="post-feed">
      {/* Pass handlePostCreated to CreatePost */}
      <CreatePost onPostCreated={handlePostCreated} />

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p> // Show a message when there are no posts
      ) : (
        posts
          .filter((post) => post.media && post.media.length > 0) // Filter out posts without media
          .map((post) => (
            <div key={post._id} className="post">
              {/* Post Header */}
              <div className="post-header">
                <img
                  src={post.author.profilePic || "defaultProfilePic.jpg"}
                  alt="Author"
                  className="post-avatar"
                  onClick={() => handleProfileClick(post.author._id)} // Handle profile click
                />
                <div>
                  <p
                    className="post-author"
                    onClick={() => handleProfileClick(post.author._id)} // Also clickable by author name
                  >
                    {post.author?.name || "Unknown Author"}
                  </p>
                  <p className="post-created-at">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="post-content">{post.content}</p>

              {/* Post Media */}
              {post.media && post.media.length > 0 ? (
                <img src={post.media[0]} className="post-media" />
              ) : null}

              {/* Post Actions */}
              <div className="post-actions">
                <span onClick={() => handleLikePost(post._id)}>
                  <FaHeart className="icon-heart" /> {post.likes.length} Likes
                </span>
                <span>
                  <FaShare className="icon-share" /> {post.shares.length} Shares
                </span>
                <span>
                  <FaRegBookmark className="icon-save" /> {post.savedBy.length} Saves
                </span>
              </div>

              {/* Comments Section */}
              <div className="post-comments">
                <h4>Comments</h4>
                {post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p>
                        <strong>User:</strong> {comment.text}
                      </p>
                      <p className="comment-date">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default PostFeed;
