import { RootState } from "@/lib/Redux/store";
import { FeedItem } from "@/types";
import { useState } from "react";
import { FaRegImage, FaFileAlt, FaHandsHelping } from "react-icons/fa";
import { useSelector } from "react-redux";
import profileImage from "@/public/assests/profile-demo.jpg";
import Image from "next/image";

interface CreatePostProps {
  onCreate: (post: FeedItem) => void;
}

const CreatePost = ({ onCreate }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [visibility, setVisibility] = useState("Anyone");

  const userId = useSelector((state: RootState) => state.user.userId);
  const username = useSelector((state: RootState) => state.user.username);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: FeedItem = {
      _id: new Date().toISOString(),
      author: userId || "",
      userId: userId || "",
      username: username || "",
      content,
      createdAt: new Date().toISOString(),
      images: media ? [URL.createObjectURL(media)] : [], // Media URL if file is added
      title,
      updatedAt: new Date().toISOString(),
      upvotes: [],
      isUpvoted: false,
      isSaved: false,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }
      onCreate(newPost);
      setTitle("");
      setContent("");
      setMedia(null); // Reset media
      setIsModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  console.log(username);

  return (
    <div>
      {/* Main Post Box */}
      <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-sm rounded-lg dark:text-white dark:bg-gray-900 dark:border border-white">
        {/* <img
          // src="/path/to/profile.jpg"
          src="/profile-demo.png"
          alt="User"
          className="w-10 h-10 rounded-full border border-black object-cover dark:border-white"
        /> */}

        <Image
          src={profileImage}
          alt="Profile Image"
          width={60}
          height={60}
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <input
          type="text"
          placeholder="Start a post..."
          onClick={() => setIsModalOpen(true)}
          className="flex-grow ml-4 p-2 border border-gray-300 rounded-full focus:outline-none cursor-pointer"
          readOnly
        />

        <div className="flex items-center space-x-4 ml-4">
          <button
            type="button"
            className="flex items-center space-x-2 border border-black text-blue-500 hover:bg-blue-100 p-2 rounded-lg dark:border-white"
          >
            <FaRegImage className="w-6 h-6" />
            <span>Media</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 text-purple-500 border border-black hover:bg-purple-100 p-2 rounded-lg dark:border-white"
          >
            <FaHandsHelping className="w-6 h-6" />
            <span>Appeal</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 text-red-500 border border-black hover:bg-red-100 p-2 rounded-lg dark:border-white"
          >
            <FaFileAlt className="w-6 h-6" />
            <span>Write article</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            {/* Header with User Info */}
            <div className="flex items-center space-x-4 mb-4">
              {/* <img
                src="/path/to/profile.jpg"
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              /> */}
              <div>
                <h2 className="text-xl font-semibold">
                  {/* {username || "Username"}*/}
                  {username}
                </h2>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="text-sm border border-gray-300 p-1 rounded mt-1 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Anyone">Post to Anyone</option>
                  <option value="Connections">Post to Connections</option>
                  <option value="Only Me">Only Me</option>
                </select>
              </div>
            </div>

            {/* Post Content Form */}
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none dark:bg-gray-700 dark:text-white"
              />

              {/* Content */}
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none dark:bg-gray-700 dark:text-white h-24"
              />

              {/* Media Button */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-blue-500 border border-black hover:bg-blue-100 p-2 rounded-lg dark:border-white"
                >
                  <FaRegImage className="w-6 h-6" />
                  <span>Add Media</span>
                </button>
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={(e) =>
                    e.target.files && setMedia(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
