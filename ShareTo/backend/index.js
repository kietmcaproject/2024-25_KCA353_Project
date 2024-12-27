// const express = require('express');
// const http = require('http');
// const {Server} = require('socket.io');
// const db = require('./db/database');
// const router = require('./Routes/router');
// const cors = require('cors');
// const path = require('path');

// require('dotenv').config();

// let rooms = [];

// const app = express();
// app.use(cors());

// const httpserver = http.createServer(app);
// const io = new Server(httpserver , { cors : {
//         origin: "*", // Your React frontend URL
//     },
// });

// db.dbConnect(process.env.DB_URL);
// const PORT = process.env.PORT;

// // middlewares
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../frontend')));
// app.use('/api' , router);

// io.on('connection' , (socket) => {
//   socket.on('sender-join', (roomID) => {
//     console.log("sender joined on roomID " , roomID);
//     socket.join(roomID)
//   });
//   socket.on('reciever-join',(roomID)=>{
//     console.log("Reciever joined ", socket.id);
//     if(io.sockets.adapter.rooms.get(`${roomID}`)){
//       socket.join(roomID)
//       io.to(roomID).emit('init',{message:'Receiver Connected',id:socket.id})
//       io.to(socket.id).emit('join-success',{message:'Room Joined',id:roomID})
//     }else{
//       socket.emit('error',{'message':'Invalid Room Name'})
//     }
//   })
      
//       socket.on('data', (roomID , data) => {
//         console.log("data recieved and send to reciever on room " ,roomID, "  " , data , " socket ID is " , socket.id );
//         io.to(roomID).emit('data',data)
//       });
//     socket.on('disconnect' , ()=>{
//         console.log("User Disconnected ", socket.id)
//     })
    
// })

// // // Routes request
// // app.get('/' , (req,res)=>{
// //     res.json({
// //         msg : "Home Route"
// //     })
// // })

// // listening on PORT 
// httpserver.listen(PORT , ()=>{
//     console.log("APP is listening on PORT " , PORT);
// })


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db/database');
const router = require('./Routes/router');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

let rooms = [];

const app = express();
app.use(cors());

const httpserver = http.createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: "*", // Your React frontend URL
    },
});

db.dbConnect(process.env.DB_URL);
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api', router);

io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    // Sender joining a room
    socket.on('sender-join', (roomID) => {
        console.log("Sender joined room: ", roomID);
        socket.join(roomID);
    });

    // Receiver joining a room
    socket.on('receiver-join', (roomID) => {
        console.log("Receiver joined room: ", roomID);
        if (io.sockets.adapter.rooms.get(roomID)) {
            socket.join(roomID);
            io.to(roomID).emit('init', { message: 'Receiver Connected', id: socket.id });
            io.to(socket.id).emit('join-success', { message: 'Room Joined', id: roomID });
        } else {
            socket.emit('error', { 'message': 'Invalid Room Name' });
        }
    });

    // Transfer data from sender to receiver
    socket.on('data', (data) => {
        const roomID = data.roomID;
        console.log("Data received and sent to room: ", roomID);
        io.to(roomID).emit('data', data);
    });

    socket.on('meta-data', ({name , size, roomID}) => {
        console.log("meta-data received ", name , " ", size , " and sent to room:" ,  roomID);
        io.to(roomID).emit('meta-data', {name , size});
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log("User Disconnected: ", socket.id);
    });
});

// listening on PORT 
httpserver.listen(PORT, () => {
    console.log("App is listening on PORT ", PORT);
});
