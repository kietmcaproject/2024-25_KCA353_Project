import React from 'react'
import logo from "./logo.png"
import img from "./abc.png"
import { NavLink } from 'react-router-dom'

 const Index = () => {

  return (
    
       <div className="bg-gradient-to-r from-[#07012d] to-[#3c003e] w-screen h-screen flex place-items-center justify-center font-classy">
      <div
        className="w-3/5 h-3/4 bg-white flex rounded-3xl 
"
      >
        <img src={logo} className=" ml-6 mt-3 w-30 h-24 " alt="" />
        <div className="flex items-center justify-between font-bold      ">
          <img src={img} className="w-[450px] h-3/4 mt-14 -ml-28 " alt="" />
          <div>
            <h1 className="text-4xl mr-6 leading-snug">
              Learn Smarter , Quiz Better With AI-Powered Insights
            </h1>
<NavLink to="/login">
<button
  class="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-2xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600 mt-8"
>
  <div
    class="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl  w-full h-full"
  >
    <div
      class="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        class="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        ></path>
      </svg>
      Log In
    </div>
  </div>
</button>
</NavLink>

 <NavLink to="/Signup">
<button
  class="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-2xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600 mt-8 ml-8 "
>
  <div
    class="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl  w-full h-full"
  >
    <div
      class="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        class="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        ></path>
      </svg>
      Sign Up
    </div>
  </div>
</button>
</NavLink>



          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Index
