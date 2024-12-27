import React from 'react'
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const color = window.location.pathname == "/" ? "black" : "yellow-500";
    useEffect(() => {
      console.log(window.location);
    } , []);

      const GoToLogin = () => {
        navigate('/Login');
      }
      const GoToSignup = () => {
        navigate('/Signup');
      }
      const GoToProfile = () => {
        navigate('/Profile');
      }
  
  return (
    <header className='absolute top-4 flex justify-between items-center w-screen pl-10 pr-10'>
        <span style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} className={`text-${color} text-2xl font-serif cursor-pointer`} onClick={()=>navigate('/')}>ShareTo</span>
        <div className='flex gap-8 max-md:hidden'>
            {!token && <span style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}}  onClick={GoToLogin} className='text-yellow-500 text-xl cursor-pointer font-serif'>Login</span>}
            {!token && <span style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} onClick={GoToSignup} className='text-yellow-500 text-xl cursor-pointer font-serif'>Signup</span>}
            {token && <span style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} onClick={GoToProfile} className='text-yellow-500 text-xl cursor-pointer font-serif'>Profile</span>}
            <span style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} className='text-yellow-500 text-xl cursor-pointer font-serif'>Support</span>
        </div>
      </header>
  )
}

export default Header
