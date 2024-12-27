import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';


function Home() {

    const navigate = useNavigate();
  
    const HandelRecieverAction = () => {
      navigate('/Reciever');
    }
    const HandelSenderAction = () => {
      navigate('/Sender');
    }

  return (
    <div>
      <Header/>
      <div className={`flex h-screen w-screen`}>
        <p style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} 
          className='text-[50px] absolute text-black top-32 left-36 flex justify-center items-center tracking-widest gap-2 text-center'>
          <span className='text-black'>Effortless Sharing ,</span>
          <span className='text-yellow-500 ml-4'> Instant Connections</span>
        </p>

        

        <p style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} 
          className='text-[180px] absolute text-black bottom-0 left-[350px] flex justify-center items-center tracking-widest'>
          <span className='text-black'>Sha </span> 
          <span className='text-yellow-500 ml-8'> reTo </span>
        </p>
        <div className='text-black bg-yellow-500 height-full w-2/4 flex flex-col gap-8 justify-center items-center'>
        <p style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} 
          className='text-[50px] text-black flex justify-center items-center tracking-widest gap-2 text-center'>
          <span className='text-black'>Are u a Sender</span>
        </p>
            <button style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} onClick={HandelSenderAction} className='text-yellow-500 shadow-white shadow-sm w-32 border-2 h-12 font-bold border-white rounded-md bg-black'>Send Data</button>
        </div>
        
        <div className='flex flex-col gap-8 w-2/4 bg-black justify-center items-center'>
        <p style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} 
          className='text-[50px] text-black flex justify-center items-center tracking-widest gap-2 text-center'>
          <span className='text-yellow-500'>or a Reciever</span>
        </p>
            <button style={{"font-family": "Rubik Wet Paint", "font-weight": "400", "font-style": "normal"}} onClick={HandelRecieverAction} className='text-black shadow-white shadow-sm w-32 border-2 h-12 font-bold border-white rounded-md bg-yellow-500'>Recieve Data</button>
        </div>
      </div>

    </div>
  )
}

export default Home
