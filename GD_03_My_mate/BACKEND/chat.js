const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); 
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());  
// Serve static files (optional)
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a new message is sent
  socket.on('send_message', (message) => {
    console.log('New message:', message);
    
    // Broadcast the message to all clients, including the sender
    io.emit('receive_message', message); // This will send the message to everyone
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(7000, () => {
  console.log('Server is running on http://localhost:7000');
});
