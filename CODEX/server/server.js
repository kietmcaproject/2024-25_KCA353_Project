const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const connectDB = require('./db/dbconnect');
const dotenv = require('dotenv');
const SignUpRouter = require('./routes/Signup');
const cookie = require('cookie-parser');
const loginRouter = require('./routes/Login');
const jwt = require('jsonwebtoken');
const http = require('http');
const path = require('path');
const {v4 : uuidV4} = require('uuid')
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');
const verifyToken = require('./middleware/auth');
const createRoomRoute = require('./routes/CreateRoom');
const dashboardRouter = require('./routes/Dashboard');
const saveCodeRoute = require('./routes/SaveCodeRoute');
const fetchRoomsRoute = require('./routes/FetchRoomsRoute');
dotenv.config(); 

const app = express(); 
const server = http.createServer(app);
//new io server on them
const io = new Server(server);

const port = process.env.PORT || 3100;

app.use(cookie());
app.use(
    cors({
        // origin: "http://13.211.228.124", // Replace with your frontend origin
        origin: "http://localhost:5173", // Replace with your frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// app.options('/save-code', cors()); // Handle preflight requests for /save-code


app.use(bodyparser.json());
app.use(express.json());


// i viv is correcting the path now 

// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });



app.use('/', SignUpRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter)
app.use('/', createRoomRoute);
app.use('/', saveCodeRoute);
app.use('/', fetchRoomsRoute);

// app.use(express.static('build'));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SAVE_CODE, ({roomId, code}) => {
        socket.in(roomId).emit(ACTIONS.SAVE_CODE, {code});
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

connectDB()
    .then(() => {
        server.listen(port, () => { 
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Failed to start server: ", err);
    });


