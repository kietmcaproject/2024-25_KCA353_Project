const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const { User } = require("../models/user");
const upload = require("../middlewares/dpUpload");
const authenticateJwt = require("../middlewares/authentication");

// Route for uploading profile pictures
router.post(
  "/upload-profile-picture",
  authenticateJwt,
  upload.single("file"),
  async (req, res) => {
    try {
      const filePath = req.body.oldPfp;
      const profile = await User.findOneAndUpdate(
        { username: req.user.username },
        { profilePicture: `/uploads/profile-pictures/${req.file.filename}` }, // Save relative file path
        { new: true, upsert: true }
      );
      try {
        if (filePath) {
          const fullPath = path.join(path.dirname(__dirname), filePath);
          await fs.unlink(fullPath);
        }
      } catch { }
      res.json({ success: true, profilePicture: profile.profilePicture });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to upload profile picture" });
    }
  }
);

router.delete("/delete-profile-picture", authenticateJwt, async (req, res) => {
  const userId = req.body.id;
  const filePath = req.body.profilePicture;

  if (!filePath) {
    return res.status(400).send("File path is required");
  }
  try {
    const fullPath = path.join(path.dirname(__dirname), filePath);
    await fs.unlink(fullPath);
    await User.findByIdAndUpdate(userId, {
      $unset: { profilePicture: "" },
    });
    res.status(200).send("File deleted and profile picture reference removed");
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("File not found");
    } else {
      res.status(500).send("Error deleting file");
    }
  }
});

module.exports = router;
