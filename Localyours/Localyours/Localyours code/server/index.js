import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import answerRoutes from "./routes/Answers.js";
import questionRoutes from "./routes/Questions.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("This is a Feedback loop");
});

app.use("/user", userRoutes);
app.use("/answer", answerRoutes);
app.use("/questions", questionRoutes);


const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
