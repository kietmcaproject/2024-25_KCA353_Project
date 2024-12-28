import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access. Token is missing." });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-refreshToken -password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    
    return res.status(401).json({ message: error.message || "Invalid token." });
  }
};
