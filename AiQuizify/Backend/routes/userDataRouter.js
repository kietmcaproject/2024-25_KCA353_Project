
import express from 'express';
import User from '../model/auth.model.js';
const router = express.Router();



router.post("/:id", async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            quizAttempted: {
              $each: [{ quizId: req.body.quizId, quizResult: req.body.quizResult }],
            },
          },
        },
        { new: true }
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  export default router;