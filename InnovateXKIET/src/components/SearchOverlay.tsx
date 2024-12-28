"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedItem {
  _id: string;
  author: string;
  username: string;
  content: string;
  createdAt: string;
  images: string[];
  title: string;
  updatedAt: string;
  upvotes: (string | null)[];
  isUpvoted?: boolean;
  isSaved?: boolean;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);

  const router = useRouter();

  // Fetch feed data
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch feed data");

        const data = await res.json();
        const formattedData = data.data.map((item: FeedItem) => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleString(),
          updatedAt: new Date(item.updatedAt).toLocaleString(),
        }));
        setFeed(formattedData);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load feed. Please try again later.");
      }
    };

    fetchFeed();
  }, []);

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) throw new Error("Failed to fetch search results.");

      const data = await response.json();
      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch profile data");

      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Error:", error);
      setProfileError("Failed to load profile. Please try again later.");
    }
  };

  // Handle profile click and navigate
  const handleProfileClick = (userId: string) => {
    sessionStorage.setItem("profileUserId", userId);
    router.push(`/user/profile?userId=${userId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 p-6 rounded-lg w-11/12 max-w-lg mx-auto text-white">
        <button
          className="absolute top-4 right-4 text-xl text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl mb-4">Search</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search term..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Scrollable Search Results */}
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {results.length > 0
            ? results.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-700 p-4 rounded cursor-pointer"
                  onClick={() => handleProfileClick(post.author)}
                >
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>
                      Author (click to view profile): {post.author || "Unknown"}
                    </p>
                  </div>
                </div>
              ))
            : !loading && <p className="text-center">No results found</p>}
        </div>

        {/* Profile Information */}
        {profile && (
          <div className="mt-6 p-4 bg-gray-700 rounded max-h-40 overflow-y-auto">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p>Name: {profile.username}</p>
          </div>
        )}
        {profileError && (
          <p className="text-center text-red-500">{profileError}</p>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
