import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import search from "./search.png";
import user from "./user.png";
import p1 from "./p1111.jpg";
import p2 from "./p3.png";
import p3 from "./p4.png";
import js from "./js.jpeg";
import c from "./c.jpg";
import java from "./java.jpg";
import python from "./oython.jpg";

const Dashboard = () => {
  const ph = [p1, p2, p3];

  const [photo, setPhoto] = useState(ph[0]);


  setTimeout(function () {
    if (photo == ph.length - 1) {
      setPhoto(ph[0]);
      return;
    }
    setPhoto(ph[photo]++);
  }, 1000); // 2000 milliseconds = 2 seconds

  return (
    <div className="font-classy">
      <nav className=" justify-between  flex items-center shadow-lg ">
        <img className="w-28 ml-8" src={logo} alt="" />
        <div className="flex gap-20 mr-20 items-center">
          <a href="" className="text-lg hover:underline decoration-[#722974] ">
            Home
          </a>
          <a href="" className="text-lg hover:underline decoration-[#722974] ">
            About
          </a>
          <a href="" className="text-lg hover:underline decoration-[#722974] ">
            All Users
          </a>
          <a href="" className="text-lg hover:underline decoration-[#722974] ">
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
              className="w-8 absolute right-[160px] mt-2"
              alt=""
            />
            <img src={user} className="w-12 ml-6 cursor-pointer" alt="" />
          </div>
        </div>
      </nav>

      {/* <div className="h-[640px] overflow-hidden  ">
        <img src={photo} className="w-full h-full " alt="" />
      </div> */}

    {/* <marquee scrollamount="10" behavior="" > */}
    
    <div>
      
    </div>
      <div className="flex  mx-4  ">
      <div className="mt-6  ">
        <div className="w-80 h-80 text-center text-white rounded-t-3xl cursor-pointer bg-black ">
          <img src={js} className="w-full h-3/4 rounded-t-3xl" alt="" />
          <h1 className="text-2xl mt-7">Top Js 10 Question's</h1>
        </div>
      </div>
      <div className="mt-6 mx-10 ">
        <div className="w-80 h-80 text-center text-white rounded-t-3xl cursor-pointer bg-black ">
          <img src={c} className="w-full h-3/4 rounded-t-3xl" alt="" />
          <h1 className="text-2xl mt-7">Top Js 10 Question's</h1>
        </div>
      </div>
      <div className="mt-6 mx-10 ">
        <div className="w-80 h-80 text-center text-white rounded-t-3xl cursor-pointer bg-black ">
          <img src={java} className="w-full h-3/4 rounded-t-3xl" alt="" />
          <h1 className="text-2xl mt-7">Top JAVA 10 Question's</h1>
        </div>
      </div>
      <div className="mt-6 mx-10 ">
        <div className="w-80 h-80 text-center text-white rounded-t-3xl cursor-pointer bg-black ">
          <img src={python} className="w-full h-3/4 rounded-t-3xl" alt="" />
          <h1 className="text-2xl mt-7">Top Python 10 Question's</h1>
        </div>
      </div>
      </div>
      </div>
      // {/* </marquee> */}
    
  );
};

export default Dashboard;
