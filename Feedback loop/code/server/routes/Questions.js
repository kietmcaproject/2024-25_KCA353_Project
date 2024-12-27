import express from "express";
import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/get", getAllQuestions);
router.post("/Ask", auth, AskQuestion);
router.patch("/vote/:id", auth, voteQuestion);
router.delete("/delete/:id", auth, deleteQuestion);

export default router;
