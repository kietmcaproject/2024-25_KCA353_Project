import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 3008;
const HOST = process.env.HOST
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Hello ${req.ip}, welcome to the Roomwala Backend Server!</h1>`); 
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port},  ${HOST}:${port}`);
    });
