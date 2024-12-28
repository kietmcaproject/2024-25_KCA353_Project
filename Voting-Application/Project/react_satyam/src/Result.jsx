import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const Result = () => {
  const[mathData,setMathData]=useState(0)
  const[englishData,setEnglishData]=useState(0)
  const[scienceData,setScienceData]=useState(0)
  useEffect(() => {
axios.get('http://localhost:3001/Math')
.then(resp=>{
  
  console.log(resp)
  const{mathCount}=resp.data
  setMathData(mathCount)
})
  },[])
  useEffect(() => {
    axios.get('http://localhost:3001/Science')
    .then(resp=>{
      
      console.log(resp)
      const{scienceCount}=resp.data
      setScienceData(scienceCount)
    })
      },[])
  useEffect(() => {
axios.get('http://localhost:3001/English')
.then(resp=>{
  
  console.log(resp)
  const{englishCount}=resp.data
  setEnglishData(englishCount)
})
  },[])

  return (
    <>
    <Header/>
    <div className="h-full bg-gray-100 flex flex-col items-center py-10">      <h1 className="text-4xl font-bold text-gray-800 mb-10">Voting Results</h1>

      <div className="flex flex-wrap justify-center gap-16">
        {/* Math Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Math</h2>
          <p className="text-gray-700 font-semibold text-lg">Votes: {mathData}</p>
        </div>

        {/* Science Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Science</h2>
          <p className="text-gray-700 font-semibold text-lg">Votes:{scienceData} </p>
        </div>

        {/* English Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">English</h2>
          <p className="text-gray-700 font-semibold text-lg">Votes:{englishData}</p>
        </div>
      </div>

      <div className="mt-10 flex space-x-4">
        <NavLink to="/Vote">
          <button className="bg-blue-600 font-bold text-white px-6 py-3 rounded-lg hover:bg-gray-200 hover:text-black transition duration-300"
            aria-label="Go Back to Vote">Go Back to Vote</button>
        </NavLink>

        <NavLink to="/Home">
          <button className="bg-gray-600 font-bold text-white px-6 py-3 rounded-lg hover:bg-gray-200 hover:text-black transition duration-300"
            aria-label="Go to Home">Go to Home</button>
        </NavLink>
      </div>
    </div>
    <div className='mt-32'>
    <Footer/>
    </div>
    </>
  );
};

export default Result;
