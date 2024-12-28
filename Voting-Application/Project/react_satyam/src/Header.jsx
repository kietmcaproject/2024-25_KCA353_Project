import React from 'react'
import {  NavLink, Outlet } from 'react-router-dom';


const Header = () => {
  return (
    <div className="bg-gray-100 font-sans" >
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">CourseVote</h2>
          <nav className="flex space-x-4">
          <ul className='flex items-center gap-14 mr-5'>
          <NavLink to="/Home"><li className="text-black hover:text-blue-800">Home</li></NavLink>
          <NavLink to="/VotingPage">  <li className="text-black hover:text-blue-800">Courses</li></NavLink>
          <NavLink to="/Vote"> <li className="text-black hover:text-blue-800">Vote</li></NavLink>
          <NavLink to="/Result"><li className="text-black hover:text-blue-800">Results</li></NavLink>
          <NavLink to="/Signup"><button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-black transition duration-300">Log Out</button></NavLink>
          </ul>
          </nav>
        </div>
         </header>
    </div>
  )
}

export default Header