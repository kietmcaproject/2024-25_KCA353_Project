import PrivateRoute from '@/components/privateRoute';
import React from 'react';

const MessagesPage = () => {
  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="">
          <span className="font-bold text-4xl">Messages</span>
          <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?  
          </div>
          <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum necessitatibus accusantium iste autem ratione ipsum itaque pariatur, nihil officiis doloribus beatae consectetur laboriosam quaerat totam mollitia impedit numquam cum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ipsum libero. Magni illum labore amet praesentium aliquam soluta eligendi recusandae cum, quia voluptatibus explicabo alias dolorem voluptatem maiores, pariatur minus?  
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MessagesPage;
