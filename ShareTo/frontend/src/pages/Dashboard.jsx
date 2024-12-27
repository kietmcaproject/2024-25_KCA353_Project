import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { gsap } from "gsap";
import Home from "./Home";


const Dashboard = () => {

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const options = useRef(null);

  const [animationDone , setAnimationDone] = useState(false);

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline();
    setAnimationDone(false);
    // Animate the lines from the left to the center of the page
    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { x: '-100%' },   // Start from outside the left of the viewport
      { x: '0%', duration: 1.5, stagger: 0.2, ease: 'power3.out' } // End in the center with staggered delay
    ).to(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { fontSize: '220px', duration: 3, ease: 'power8.out', opacity: 0 },  // Increase font size smoothly
    )
  }, []);

  setTimeout(() => {
    setAnimationDone(true);
  }, 4000);

  // const socket = io('https://shareto.onrender.com');
  const socket = io('http://localhost:5000');
  console.log("I reached here just before on init event");
  socket.on("Data", (data) => {
    console.log("Connection established", data);
  });

  return (
    <div className={`${animationDone == false ? 'flex justify-center items-center' : ''}  w-screen h-screen`}>
      <p style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} className={`${animationDone == true ? 'hidden' : 'block'} text-white font-large font-serif flex flex-col text-center w-full`}><span ref={line1Ref} className="text-6xl one">Welcome To</span> <span ref={line2Ref} className="text-6xl font-bold two text-yellow-500">The</span> <span ref={line3Ref} className="text-7xl font-bold ml-72 three text-yellow-500"> ShareTo </span></p>
      { animationDone === true ? <Home/>  : null}
    </div>
  );
};

export default Dashboard;
