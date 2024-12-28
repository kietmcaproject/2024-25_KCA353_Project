import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import carRouter from './routes/car.routes.js';

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v2/cars", carRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

export { app };
