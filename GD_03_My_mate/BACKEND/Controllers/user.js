const userSchema = require("../Models/user");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const Profile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
    // Await the result of the find query
    const user = await userSchema.findOne({ _id: userId }).populate('following');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return only the necessary data
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const UpdateProfile = async (req, res) => {
  const { name, email, bio } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      message: "User not found. Please log in again.",
    });
  }

  try {
    let profilePicUrl;
    let profilePicPublicId;

    // Check if a new profile picture file is provided
    if (req.file) {
      // Upload the profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "myMate-Profiles",
        resource_type: "auto",
      });
      profilePicUrl = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
    }

    const updated = await userSchema.findOneAndUpdate(
      { _id: userId },
      {
        name,
        email,
        bio,
        profilePic: profilePicUrl || undefined,
        profilePicPublicId: profilePicPublicId || undefined,
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "User not found or update failed." });
    }

    // Optionally delete the temporary file after uploading
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("File deletion error:", err);
      });
    }

    res.json({ user: updated });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not update profile.", error });
  }
};

const AllProfile = async (req, res) => {
  try {
    // Fetch all users asynchronously
    const users = await userSchema.find(); 

    // Return the users in the response
    res.status(200).json({
      users, // Send the fetched users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users.',
    });
  }
};

const UpdateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({ message: "Bio is required." });
    }
    const user = await userSchema.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.bio = bio;

    await user.save();

    return res.status(200).json({ message: "Bio updated successfully.", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};


const GetUser = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID not provided." });
  }

  try {
    const user = await userSchema.findOne({ _id: userId }).populate('followers') 
    .populate('following')  
    .populate('posts');

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve user.", error });
  }
};

const Follow = async (req, res) => {
  const user = req.user;
  const followUserId = req.params.userId;

  if (!followUserId) {
    return res.status(400).json({ message: "User ID to follow not provided." });
  }

  try {
    const targetUser = await userSchema.findById(followUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to follow not found." });
    }

    // Add followUserId to user's following list and user._id to targetUser's followers list
    if (!user.following.includes(followUserId)) {
      user.following.push(followUserId);
    }

    if (!targetUser.followers.includes(user._id)) {
      targetUser.followers.push(user._id);
    }

    // Save changes to the database
    await user.save();
    await targetUser.save();

    res.json({
      message: "User followed successfully.",
      following: user.following,
      followers: targetUser.followers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Could not follow user.", error });
  }
};

const Unfollow = async (req, res) => {
  const user = req.user;
  const unfollowUserId = req.params.userId;

  if (!unfollowUserId) {
    return res
      .status(400)
      .json({ message: "User ID to unfollow not provided." });
  }

  try {
    const targetUser = await userSchema.findById(unfollowUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to unfollow not found." });
    }

    // Remove unfollowUserId from user's following list and user._id from targetUser's followers list
    user.following = user.following.filter(
      (id) => id.toString() !== unfollowUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== user._id.toString()
    );

    // Save changes to the database
    await user.save();
    await targetUser.save();

    res.json({
      message: "User unfollowed successfully.",
      following: user.following,
      followers: targetUser.followers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Could not unfollow user.", error });
  }
};

module.exports = {
  Profile,
  UpdateBio,
  AllProfile,
  UpdateProfile,
  GetUser,
  Follow,
  Unfollow,
};
