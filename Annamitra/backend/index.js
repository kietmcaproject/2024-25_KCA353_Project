const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/Auth");
const listRoutes = require("./routes/lists");
const formRoutes = require("./routes/forms");
const matchRoutes = require("./routes/match");
const profileRoutes = require("./routes/profile");
const { dbConnect } = require("./database");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS configuration to allow only your frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "username",
      "password",
      "user_id",
      "request_id",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Enable pre-flight for all routes
app.options("*", cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files for profile pictures
app.use(
  "/uploads/profile-pictures",
  express.static(path.join(__dirname, "uploads", "profile-pictures"))
);

// Connect to MongoDB
dbConnect();

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
