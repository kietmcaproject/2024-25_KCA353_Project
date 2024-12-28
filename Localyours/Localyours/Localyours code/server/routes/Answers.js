import express from "express";
import auth from "../middleware/auth.js";
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswer);

export default router;
