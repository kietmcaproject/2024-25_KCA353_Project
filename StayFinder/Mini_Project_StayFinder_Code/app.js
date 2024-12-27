if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");//Express Error
const port = 8080;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main().then((res) => {
  console.log("Data base is running");
}).catch((ex) => {
  console.log(ex);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized:true,
  Cookie:{
    expires:Date.now() + 7 * 24 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly:true,
  },
};

app.get("/", (req, res) => {
  res.send("app is working");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success"); 
  res.locals.error = req.flash("error"); 
  res.locals.currUser = req.user;
  next(); 
});


//listings --route
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/", userRouter);

//err when route not match 
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Note Found !"));
});


//middleware error handling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });

});

app.listen(port, (req, res) => {
  console.log("app is listing");
});



