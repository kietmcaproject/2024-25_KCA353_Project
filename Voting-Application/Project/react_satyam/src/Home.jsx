import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {  NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <Header/>
      <div className="bg-gray-100 font-sans">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold leading-tight mb-4">Make Every Vote Count!</h1>
            <p className="text-lg mb-6">Join our platform to cast your vote and have your voice heard. Voting has never been this easy and accessible.</p>
            <NavLink to="/Vote"><button className="bg-gray-600 text-white-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 hover:text-black transition duration-300">Get Started</button></NavLink>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img src="/image1.jpg" alt="Voting Illustration" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
    
  )
}

export default Home;