import PrivateRoute from '@/components/privateRoute';
import React from 'react';

const HelpPage = () => {
  return (
    <PrivateRoute>
      <span className="font-bold text-4xl">Help</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </PrivateRoute>
  );
};

export default HelpPage;
