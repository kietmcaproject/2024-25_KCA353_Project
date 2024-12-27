import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
// const socket = io('https://shareto.onrender.com'); // Replace with your server URL
const socket = io('http://localhost:5000'); // Replace with your server URL

const Sender = () => {
  const [roomID, setRoomID] = useState('');
  const [file, setFile] = useState(null);
  const [roomCreated , setRoomCreated] = useState(false);

  const handleRoomJoin = () => {
    const room = roomID.trimStart();
    setRoomID(room);
    if(!roomCreated && room){
      socket.emit('sender-join', room);
      console.log('Sender joined room: ', room);
      setRoomCreated(true);
      toast.success("Room Created Successfully");
    }else{
      toast.error("Room Not created");
    }
  };
  const handleCopyRoomJoin = async() => {
    if(roomCreated){
      try{
        await navigator.clipboard.writeText(roomID);
        toast.success("Room Copied");
      }catch(e){
        console.log("Error in copy text : " , e);
        toast.error("Failed to copy text");
      }
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Before emmiting : ", selectedFile);
    if(selectedFile){
      console.log(selectedFile);
      socket.emit("meta-data" , {name: selectedFile.name, size: selectedFile.size, roomID});
    }
  };

  const sendFile = () => {
    console.log("Before send file: ", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = {
          roomID,
          file: reader.result,
        };
        socket.emit('data', data);
        console.log('File sent to room: ', roomID);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header/>
      <div className='text-white flex flex-col justify-center items-center gap-5 h-screen'>
        <h2 className='text-2xl text-yellow-500 font-semibold'>You are a Sender :</h2>
        <div className='flex gap-4'>
          <input
            type="text"
            className={`${roomCreated ? "text-white" : "text-black"} p-2 outline-none rounded-md `}
            value={roomID}
            disabled = {roomCreated}
            placeholder="Enter Room ID"
            onChange={(e) => setRoomID(e.target.value)}
          />
          {!roomCreated && <button className={`text-white font-bold p-3 bg-yellow-500 border-2 rounded-md border-white`} onClick={handleRoomJoin}>Create Room</button>}
          {roomCreated && <button className={`text-white font-bold p-3 bg-yellow-500 border-2 rounded-md border-white`} onClick={handleCopyRoomJoin}>Copy Room ID </button>}
        </div>
        <br />
        {roomCreated && <input className='text-white font-bold p-3 bg-yellow-500 border-2 rounded-md border-white' type="file" onChange={handleFileChange} />}
        {roomCreated && <button className='text-white font-bold p-3 bg-yellow-500 border-2 rounded-md border-white'  onClick={sendFile}>Send File</button>}
      
        <Toaster/>
      </div>
    </>
  );
};

export default Sender;
