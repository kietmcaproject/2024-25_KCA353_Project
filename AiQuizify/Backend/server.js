import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connect from './database/conn.js';
import AuthRouter from './routes/AuthRouter.js'
import quizAdd from './routes/quizAddRouter.js';
import quiz from './routes/displayQuizRouter.js';
import getquiz from './routes/quizAddRouter.js' 
import userResult from './routes/userDataRouter.js'
// import user from './controller/authcontroller.js'

import dotenv from 'dotenv'
dotenv.config();
const app = express();

app.use("/admin", quizAdd)

app.use("/quiz", quiz)

app.use("/quiz", getquiz)

// app.use("/user", user)

app.use("/userResult", userResult)


const PORT = process.env.PORT || 4003;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);



app.listen(PORT, async function () {
    try {
        await connect();
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});



