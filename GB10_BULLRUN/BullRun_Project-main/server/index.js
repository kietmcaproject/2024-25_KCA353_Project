const express = require('express')
require('dotenv').config()
const app = express();

app.get('/',(req,res)=>{
    res.send("this is om singhal");
})


app.listen(process.env.PORT||8080,()=>{
    console.log("server start");
})