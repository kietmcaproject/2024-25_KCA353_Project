// // /components/FeedItem.tsx
// import { FiHeart, FiBookmark } from 'react-icons/fi';

// interface FeedItemProps {
//   post: {
//     id: string;
//     author: string;
//     userId: string;
//     content: string;
//     time: string;
//     image?: string;
//     upvotes: string[];
//     isUpvoted: boolean;
//     isSaved: boolean;
//   };
//   handleUpvote: (id: string) => void;
//   handleSave: (id: string) => void;
// }

// const FeedItem: React.FC<FeedItemProps> = ({ post, handleUpvote, handleSave }) => {
//   return (
//     <div className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all">
//       <div className="flex items-center mb-3">
//         <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//           <img
//             src={`https://ui-avatars.com/api/?name=${}&background=random`}
//             alt={post.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="ml-4">
//           <h2 className="font-semibold text-lg">{post.name}</h2>
//           <span className="text-sm text-gray-500">{new Date(post.time).toLocaleTimeString()}</span>
//         </div>
//       </div>
//       <h2 className="font-medium mb-3">{post.content}</h2>
//       {post.image && (
//         <div className="mb-4">
//           <img src={post.image} alt={post.name} className="w-full h-64 object-cover rounded-lg" />
//         </div>
//       )}
//       <div className="flex items-center justify-between">
//         <button onClick={() => handleUpvote(post.id)} className={`flex items-center ${post.isUpvoted ? 'text-red-500' : 'text-gray-500'} mr-4`}>
//           <FiHeart className="mr-1" /> {post.isUpvoted ? 'Upvoted' : 'Upvote'}
//         </button>
//         <button onClick={() => handleSave(post.id)} className={`flex items-center ${post.isSaved ? 'text-blue-500' : 'text-gray-500'}`}>
//           <FiBookmark className="mr-1" /> {post.isSaved ? 'Saved' : 'Save'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FeedItem;
