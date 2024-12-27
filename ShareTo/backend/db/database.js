const mongoose = require('mongoose')

function dbConnect(DB_URL){
    mongoose.connect(DB_URL).then(()=>{
        console.log("Database connected successfully");
    }).catch((e)=>{
        console.log("Error occured while connecting the database " , e);
    })
}

module.exports = {dbConnect};