import PrivateRoute from "@/components/privateRoute";
import React from "react";

// const MessagesPage = () => {
//   return (
//     <PrivateRoute>
//       <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//         <div className="">
//           <span className="font-bold text-4xl">Messages</span>
//           <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?
//           </div>
//           <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?
//           </div>
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// };

const MessagesPage = () => {
  return (
    <PrivateRoute>
      {/* <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white h-screen w-screen"> */}
      {/* <div className="w-full max-w-4xl px-4 py-6"> */}
      <h1 className="font-bold text-4xl text-center mb-6">Messages</h1>
      <div className="flex flex-col md:flex-row border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden h-[80vh]">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-200 dark:bg-gray-800 p-4 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Chats</h2>
          <ul className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <li
                key={index}
                className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">User {index + 1}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    Last message preview goes here...
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    index % 2 === 0
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  Messages {index + 1}
                </div>
              </div>
            ))}
          </div>
          {/* Message Input */}
          <div className="flex items-center border-t border-gray-300 dark:border-gray-700 p-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Send
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </PrivateRoute>
  );
};

export default MessagesPage;
