
import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const VotingPage = () => {

  return (
    <>
<Header/>
    <div className="h-full bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Available Courses</h1>
      
      <div className="flex flex-wrap justify-center gap-16">
        {/* Math Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Math</h2>
          <p className="text-gray-600 mb-4">A fascinating world of numbers and equations. Cast your vote if Math is your favorite!</p>
        </div>

        {/* Science Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Science</h2>
          <p className="text-gray-600 mb-4">Discover the wonders of the universe. Vote if Science is your favorite!</p>
          </div>

        {/* English Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">English</h2>
          <p className="text-gray-600 mb-4">Explore the beauty of language and literature. Vote if English is your favorite!</p>
         </div>
      </div>
      <NavLink to="/Vote">  <button className='bg-gray-800 mt-16 font-bold text-white px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-black transition duration-300"'>Go for the vote</button></NavLink>
    </div>
    <div className='mt-10'>
    <Footer/>
    </div>
    </>
  );
};

export default VotingPage;
