const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');



const AuthRouter = require('./Routes/AuthRouter');
const PredictionRouter = require('./Routes/PredictionRouter');

const PORT = process.env.PORT || 8080;


app.get('/ping' , (req,res)=> {
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post('/api/predict/save', PredictionRouter);

app.use('/auth', AuthRouter);
app.use('/api/predict', PredictionRouter);
app.get('/api/predict/predictions', PredictionRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})