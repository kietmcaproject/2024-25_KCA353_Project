// import PrivateRoute from '@/components/privateRoute';
// import React from 'react';

// const Notification = () => {
//   return (
//     <PrivateRoute>
//       <span className="font-bold text-4xl dark:text-white">Notification</span>

//       <div className="">
//           <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?
//           </div>
//           <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?
//           </div>
//         </div>
//     </PrivateRoute>
//   );
// };

// export default Notification;

import PrivateRoute from "@/components/privateRoute";
import React from "react";

const Notification = () => {
  return (
    <PrivateRoute>
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-6">
        <h1 className="font-bold text-4xl mb-6">Notifications</h1>
        <div className="w-full max-w-3xl space-y-4">
          {/* Notification Card 1 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <h2 className="font-semibold text-lg">Notification Title</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              earum necessitatibus accusantium iste autem ratione.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
              2 hours ago
            </span>
          </div>

          {/* Notification Card 2 */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <h2 className="font-semibold text-lg">Another Notification</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
              illum labore amet praesentium aliquam soluta eligendi.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
              5 hours ago
            </span>
          </div>

          {/* Add more notification cards dynamically */}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Notification;
