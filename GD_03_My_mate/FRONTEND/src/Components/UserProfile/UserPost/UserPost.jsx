import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPost.css';

const UserPostPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null); // Track the post being deleted
  const currentUserId = localStorage.getItem("userId");

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

        if (response.ok && data) {
          const userPosts = data.filter((post) => post.author._id === userId);
          setPosts(userPosts);
        } else {
          setError("Failed to load posts");
        }
      } catch (error) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    setDeletingPostId(postId); // Set the post as being deleted
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Remove deleted post from UI
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error while deleting the post:", error);
    } finally {
      setDeletingPostId(null); // Reset the post deletion state
    }
  };

  if (loading) {
    return <p className="pf-loading">Loading posts...</p>;
  }

  if (error) {
    return <p className="pf-error">{error}</p>;
  }

  return (
    <div className="pf-user-posts">
      <h2 className="pf-h2">Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="pf-post">
            <div className="pf-post-content">
              <p>{post.content}</p>
              {post.media[0] && (
                <img src={post.media[0]} alt="post media" className="pf-post-image" />
              )}
            </div>
            {currentUserId === post.author._id && (
              <div className="pf-post-buttons">
                {deletingPostId === post._id ? (
                  <p className="pf-deleting">Deleting...</p> // Show deleting message for the specific post
                ) : (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="pf-delete-btn"
                    disabled={deletingPostId === post._id} // Disable button while deleting
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default UserPostPage;
