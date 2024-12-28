import {app} from './app.js'
import connectDB from './db/index.js';
import dotenv from 'dotenv'


dotenv.config({
    path: './env'
});

connectDB()

const PORT = 8787

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });