import React from "react";
import logo from "./logo.png";
import search from "./search.png";
import user from "./user.png";
import js from "./js.jpeg";
import c from "./c.jpg";
import java from "./java.jpg";
import hs from "./top2.png";
import Score from "./score.png";
import "./likebtn.css";
// import { NavLink } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom'



const Dashboard2 = () => {
  const navigate = useNavigate();
const handleStart = async (e) =>{
  setTimeout(() => {
    navigate('/Quiz')
}, 1000)
}
  return (
    <div className="font-classy ">
      <nav className=" justify-between  flex items-center shadow-lg ">
        <img className="w-28 ml-8" src={logo} alt="" />
        <div className="flex gap-20 mr-20 items-center">
          <a href="" className="text-lg hover:underline hover:scale-110 transition-transform duration-300 decoration-[#722974] font-bold">
            Home
          </a>
          <NavLink to="Quiz" className="text-lg hover:scale-110 transition-transform duration-300 font-bold hover:underline decoration-[#722974] ">
            Problem
          </NavLink>
          <a href="" className="text-lg hover:scale-110 transition-transform duration-300 font-bold hover:underline decoration-[#722974] ">
            All Users
          </a>
          <a href="" className="text-lg hover:scale-110 transition-transform duration-300 font-bold hover:underline decoration-[#722974] ">
            About
          </a>
          <div className="flex">
            <input
              type="text"
              placeholder="Find any User"
              className="rounded-full border-2 border-black px-4 py-1 overflow-hidden"
            />
            <img
              src={search}
              className="w-8  absolute right-[160px] mt-2"
              alt=""
            />
            <NavLink to="profile">
            <img src={user} className="w-12 hover:scale-110 transition-transform duration-300 ml-6 cursor-pointer" alt="" />
         </NavLink>
          </div>
        </div>
      </nav>
      <div className=" w-full  h-[650px] px-16  pt-3  bg-slate-100">
        <div className="flex w-full  ">
        <div className=" flex  pt-3 h-96 w-full gap-10  ">
          <div className="w-3/5 ">
          <div className="w-full  ">
            <input
              type="text"
              className=" h-10  w-full  px-4  "
              placeholder="Enter the Subject on which you want quizz.. "
            />
          </div>

          <div className="  mt-3 bg-white flex   rounded-r-2xl h-40">
            <img src={js} className=" h-40 p-2" alt="" />
            <div className="flex gap-4 mx-4 flex-col">
              <h1 className=" mt-6  text-2xl">Top JS Interviw Questions </h1>
              <div>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white" onClick={handleStart}>
                  {" "}
                  Start Now{" "}
                </button>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 ml-4 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white">
                  {" "}
                  Remine Me Later
                </button>

                <button className="buttonLike ml-[580px] relative bottom-6  ">
                  <svg
                    className="empty"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                  >
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
                  </svg>
                  <svg
                    className="filled"
                    height="32"
                    width="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0H24V24H0z" fill="none"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
          </div>
          <div className=" mt-3 bg-white flex   rounded-r-2xl h-40">
            <img src={java} className=" h-40 p-2" alt="" />
            <div className="flex gap-4 mx-4 flex-col">
              <h1 className=" mt-6  text-2xl">Top JAVA Interviw Questions </h1>
              <div>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white" onClick={handleStart}>
                  {" "}
                  Start Now{" "}
                </button>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 ml-4 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white">
                  {" "}
                  Remine Me Later
                </button>

                <button className="buttonLike ml-[580px] relative bottom-6  ">
                  <svg
                    className="empty"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                  >
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
                  </svg>
                  <svg
                    className="filled"
                    height="32"
                    width="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0H24V24H0z" fill="none"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            </div>
          <div className=" mt-3 bg-white flex   rounded-r-2xl h-40">
            <img src={c} className=" h-44 p-2" alt="" />
            <div className="flex gap-4 mx-4 flex-col">
              <h1 className=" mt-6  text-2xl">Top C Interviw Questions </h1>
              <div>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white" onClick={handleStart}>
                  {" "}
                  Start Now{" "}
                </button>
                <button className="bg-[#3c003e] hover:scale-110 transition-transform duration-300 ml-4 hover:bg-[#57015a] p-3 px-6 rounded-2xl text-white">
                  {" "}
                  Remine Me Later
                </button>

                <button className="buttonLike ml-[580px] relative bottom-6  ">
                  <svg
                    className="empty"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                  >
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
                  </svg>
                  <svg
                    className="filled"
                    height="32"
                    width="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0H24V24H0z" fill="none"></path>
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

</div>
          <div className="bg-white   h-96 rounded-2xl w-[500px]">
         <div className="flex bg-[#3c003e] justify-center">
          <h1 className=" p-3  rounded-t-2xl text-white text-2xl ">LeaderBoard - Top 10
            
          </h1>
          <img src={hs}  className="w-8 h-8 mt-3 "alt="" />
          </div>
          <div className="flex gap-7  text-lg shadow-xl ">
            <table className="w-full ">
              <tr className="border-b-2 border-black">
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Subject</th>
              </tr>
              <tr >
            <td className="pl-10">1</td>
            <td className="pl-10">Rohan Singh</td>
            <td className="pl-10">9.5 </td>
            <td className="pl-10">JS</td>
            </tr>
              <tr >
            <td className="pl-10">2</td>
            <td className="pl-10">Jaya</td>
            <td className="pl-10">9.2 </td>
            <td className="pl-10">C++</td>
            </tr>
              <tr >
            <td className="pl-10">3</td>
            <td className="pl-10">Riya Sharma</td>
            <td className="pl-10">8.5 </td>
            <td className="pl-10">JS</td>
            </tr>
              <tr >
            <td className="pl-10">4</td>
            <td className="pl-10">Siya</td>
            <td className="pl-10">8.4 </td>
            <td className="pl-10">JS</td>
            </tr>
              <tr >
            <td className="pl-10">5</td>
            <td className="pl-10">Divya Singh</td>
            <td className="pl-10">8.3 </td>
            <td className="pl-10">Node</td>
            </tr>
              <tr >
            <td className="pl-10">6</td>
            <td className="pl-10">Pooja Kumari</td>
            <td className="pl-10">8.2</td>
            <td className="pl-10">Python</td>
            </tr>
              <tr >
            <td className="pl-10">7</td>
            <td className="pl-10">Rohan</td>
            <td className="pl-10">8.1 </td>
            <td className="pl-10">C#</td>
            </tr>
              <tr >
            <td className="pl-10">8</td>
            <td className="pl-10">Raj Gupta</td>
            <td className="pl-10">8 </td>
            <td className="pl-10">Python</td>
            </tr>
              <tr >
            <td className="pl-10">9</td>
            <td className="pl-10">Piyush Sharma</td>
            <td className="pl-10">7.9 </td>
            <td className="pl-10">Node Js</td>
            </tr>
              <tr >
            <td className="pl-10">10</td>
            <td className="pl-10">Rohan Thakur</td>
            <td className="pl-10">7.3 </td>
            <td className="pl-10">C++</td>
            </tr>
            
            </table>
          </div>
          <NavLink to="Score">
          <div className="w-[500px]  bg-[#3c003e] justify-center items-center flex text-white mt-4 rounded-r-2xl  h-36 text-2xl cursor-pointer"> 
            <h1>
            Tap Here To View Your Score
            </h1>
            <img src={Score}  className="ml-3" alt="" />
          </div>
          </NavLink>
        </div>
        </div>
        
      </div>
    

          </div>

          <footer className="bg-[#3c003e] flex text-white justify-center items-center h-20">
            Thanks for visiting our website.. Keep learning 🤍
          </footer>
    </div>
  );
};

export default Dashboard2;
