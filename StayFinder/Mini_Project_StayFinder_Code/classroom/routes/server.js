const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({secret:"mysupersecretstring", resave: false, saveUnitializes:true}));

// app.get("/test",(req,res)=>{
    // res.send("test sucessful");
// });

// app.get("/requestcount",(req,res)=>{
    // if(req.session.count){
        // req.session.count++;
    // }else{
        // req.session.count = 1;
    // };
   
//    res.send(`you sent a request x ${req.session.count} times`); 
    // });

    const sessionOptions={
        secret: "mysupersecretstring",
        resave:false,
        saveUninitialized:true,
    };

    app.use(session(sessionOptions));
    app.get("/register", (req,res)=> {
        let {name= "anonymous"} = req.query;
        express.request.session.name=name;
        res.send(name);

    });

    app.get("/hello",(req,res)=>{
        res.send(`hello ${req.session.name}`);
    });

app.listen(3000,()=>{
    console.log("Server is listening to 3000");
});