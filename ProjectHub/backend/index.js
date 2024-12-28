const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv').config();
const userRoute = require('./Routes/userRoute');
const projectRoute = require('./Routes/projectRoute');
const PORT = process.env.PORT;

const app = express();

app.get('/',(req,res)=>{
    res.send("project api is runnig")
})
app.use(cors());
app.use(express.json());
app.use('/api/v1/', projectRoute);
app.use('/api/v1/', userRoute);

async function dbcon() {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

dbcon();

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
