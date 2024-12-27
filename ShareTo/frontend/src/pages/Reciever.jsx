import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from '../components/Header'
// const socket = io('https://shareto.onrender.com'); // Replace with your server URL
const socket = io('http://localhost:5000'); // Replace with your server URL

const Receiver = () => {
  const [roomID, setRoomID] = useState('');
  const [receivedFile, setReceivedFile] = useState(null);
  const [roomJoined , setRoomJoined] = useState(false);
  const [metadata,setMetaData] = useState();
  const handleRoomJoin = () => {
    socket.emit('receiver-join', roomID);
    console.log('Receiver joined room: ', roomID);
    setRoomJoined(true);
  };

  useEffect(() => {
    socket.on('data', (data) => {
      console.log('Data received: ', data);
      setReceivedFile(data.file);
    });
    socket.on('meta-data', (data) => {
      console.log('meta-data received: ', data);
      setMetaData(data);
    });

    return () => {
      socket.off('data');
    };
  }, []);

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = receivedFile;
    link.download = 'received_file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <Header/>
    <div className='text-white flex flex-col justify-center items-center gap-5 h-screen'>
      <h2 className='text-yellow-500 font-semibold text-2xl'>You are a Receiver :</h2>
      <div className='flex gap-4'>
        <input
          type="text"
          value={roomID}
          className="text-black p-2 outline-none rounded-md"
          placeholder="Enter Room ID"
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button className='text-white font-bold p-3 bg-yellow-500 border-2 rounded-md border-white' onClick={handleRoomJoin}>Join Room</button>
      </div>
      {roomJoined && <span className='text-yellow-500 text-2xl'>You will see your files here: </span>}
      {
        metadata && <span>
          File Name: {metadata.name};
        </span> }
        {
          metadata && <span>
            File Size : {metadata.size}
          </span>
        }
      {roomJoined && receivedFile && (
        <div className='flex gap-4 items-center '>
          <h3>File Received</h3>
          <button className='p-3 bg-yellow-500 rounded-md border-2 border-white' onClick={downloadFile}>Download File</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Receiver;
