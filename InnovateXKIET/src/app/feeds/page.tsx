// "use client";
// import { useEffect, useState } from "react";
// import { FiHeart, FiBookmark } from "react-icons/fi";
// import CreatePost from "@/components/create-post";
// import SearchOverlay from "@/components/SearchOverlay";

// interface FeedItem {
//   id: string;
//   content: string;
//   createdAt: string;
//   images: string[];
//   title: string;
//   updatedAt: string;
//   upvotes: string[];
//   isUpvoted?: boolean;
//   isSaved?: boolean;
// }

// const DashboardPage = () => {
//   const [feed, setFeed] = useState<FeedItem[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   // search
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const openSearch = () => setIsSearchOpen(true);
//   const closeSearch = () => setIsSearchOpen(false);

//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const res = await fetch("/api/posts");
//         if (!res.ok) throw new Error("Failed to fetch feed data");
//         const data: { data: FeedItem[] } = await res.json(); // Ensure the response is typed
//         setFeed(data.data); // Assuming your API response has a "data" field
//       } catch (error) {
//         console.error("Error:", error);
//         setError("Failed to load feed. Please try again later.");
//       }
//     };

//     fetchFeed();
//   }, []);

//   const handleUpvote = (postId: string) => {
//     setFeed(
//       feed.map((post) => {
//         if (post.id === postId) {
//           const updatedUpvotes = post.isUpvoted
//             ? post.upvotes.slice(0, -1)
//             : [...post.upvotes, "You"];
//           return {
//             ...post,
//             upvotes: updatedUpvotes,
//             isUpvoted: !post.isUpvoted,
//           };
//         }
//         return post;
//       })
//     );
//   };

//   const handleCreatePost = (newPost: FeedItem) => {
//     setFeed([newPost, ...feed]);
//   };

//   const handleSave = (postId: string) => {
//     setFeed(
//       feed.map((post) => {
//         if (post.id === postId) {
//           return { ...post, isSaved: !post.isSaved };
//         }
//         return post;
//       })
//     );
//   };

//   return (
//     <div className="flex flex-col bg-gray-100 dark:text-white dark:bg-gray-900">
//       <div className="h-1/4 p-6">
//         <CreatePost onCreate={handleCreatePost} />
//       </div>

//       <div className="h-3/4 p-6">
//         {/* search */}
//         <div>
//           <button
//             onClick={openSearch}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Search
//           </button>

//           {/* Search Overlay Component */}
//           <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
//         </div>
//         <h1 className="text-2xl font-bold mb-4">Feed</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="space-y-6">
//           {feed
//             .sort(
//               (a, b) =>
//                 new Date(b.createdAt).getTime() -
//                 new Date(a.createdAt).getTime()
//             )
//             .map((post) => (
//               <div
//                 key={post.id}
//                 className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all dark:text-white dark:bg-gray-900 dark:border border-white"
//               >
//                 <div className="flex items-center mb-3 dark:text-white dark:bg-gray-900">
//                   <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//                     <img
//                       src={`https://ui-avatars.com/api/?name=${post.title}&background=random`}
//                       alt="User Avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <h2 className="font-semibold text-lg">{post.title}</h2>
//                     <span className="text-sm text-gray-500">
//                       {new Date(post.createdAt).toLocaleTimeString()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center mb-3">
//                   <h2 className="font">{post.content}</h2>
//                 </div>
//                 {post.images.length > 0 && (
//                   <div className="mb-4">
//                     <img
//                       src={post.images[0]}
//                       alt="Post Image"
//                       className="w-full h-64 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <button
//                       onClick={() => handleUpvote(post.id)}
//                       className={`flex items-center ${post.isUpvoted ? "text-red-500" : "text-gray-500"} mr-4`}
//                       aria-label={post.isUpvoted ? "Remove upvote" : "Upvote"}
//                     >
//                       <FiHeart className="mr-1" />{" "}
//                       {post.isUpvoted ? "Upvoted" : "Upvote"}
//                     </button>

//                     <div className="flex -space-x-2">
//                       {post.upvotes.slice(0, 3).map((upvoter) => (
//                         <img
//                           key={upvoter}
//                           src={`https://ui-avatars.com/api/?name=${upvoter}&background=random`}
//                           alt={upvoter}
//                           className="w-8 h-8 rounded-full border-2 border-white"
//                           title={upvoter}
//                         />
//                       ))}
//                       {post.upvotes.length > 3 && (
//                         <span className="text-sm text-gray-500 pl-3">
//                           +{post.upvotes.length - 3} others
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => handleSave(post.id)}
//                       className={`flex items-center ${post.isSaved ? "text-blue-500" : "text-gray-500"}`}
//                       aria-label={post.isSaved ? "Unsave post" : "Save post"}
//                     >
//                       <FiBookmark className="mr-1" />{" "}
//                       {post.isSaved ? "Saved" : "Save"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { RootState } from "@/lib/Redux/store";
import { FeedItem } from "@/types";
import { useState } from "react";
import { FaRegImage, FaFileAlt, FaHandsHelping } from "react-icons/fa";
import { useSelector } from "react-redux";

interface CreatePostProps {
  onCreate: (post: FeedItem) => void;
}

const CreatePost = ({ onCreate }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // State to store the selected image
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const userId = useSelector((state: RootState) => state.user.userId);
  const username = useSelector((state: RootState) => state.user.username);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", userId || "");
    formData.append("userId", userId || "");
    formData.append("username", username || "");
    if (image) formData.append("image", image);

    try {
      setIsLoading(true);
      const res = await fetch("/api/feed", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const data = await res.json();
      onCreate(data.data); // Update the parent component with the new post
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-sm rounded-lg dark:text-white dark:bg-gray-900 dark:border border-white">
      <img
        src="/path/to/profile.jpg"
        alt="User"
        className="w-10 h-10 rounded-full border border-black object-cover dark:border-white"
      />
      <form onSubmit={handleSubmit} className="flex-grow ml-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <textarea
          placeholder="Start a post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </form>
      <div className="flex items-center space-x-4 ml-4">
        <button
          type="button"
          className="flex items-center space-x-2 border border-black text-blue-500 hover:bg-blue-100 p-2 rounded-lg dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <FaRegImage className="w-6 h-6" />
          <span>Media</span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-2 text-purple-500 border border-black hover:bg-purple-100 p-2 rounded-lg dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <FaHandsHelping className="w-6 h-6" />
          <span>Appeal</span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-2 text-red-500 border border-black hover:bg-red-100 p-2 rounded-lg dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <FaFileAlt className="w-6 h-6" />
          <span>Write article</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
