const Prediction = require("../Models/predictions");

const jwt = require("jsonwebtoken");

// const getUserIdFromToken = (req) => {

//   const authHeader = req.headers['authorization'];  
//   const token = authHeader && authHeader.split(' ')[1];
//    // Bearer <token>
//   if (!token)
//     return res.status(403).json({error:'No token provided'});

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.userId;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return null;
//   }
// };

exports.savePrediction = async (req, res) => {
  const { location, bhk, bath, area, predictedPrice } = req.body;
  const userId = req.userId || req._id;
  

  console.log(userId);

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing token "});
  }

  if (!location || !bhk || !bath || !area) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("User ID:", userId);
  console.log("Request Body:", req.body);

  try {
    const newPrediction = new Prediction({
      userId,
      location,
      bhk,
      bath,
      area,
      predictedPrice,
    });


    const savedPrediction = await newPrediction.save();

    return res.status(201).json({

      message: "Prediction saved successfully from backend!",
      data: savedPrediction,
    });

  } catch (error) {
    console.log("Error saving prediction:", error);
    return res.status(500).json({ message: "Server error"+error});
  }
};
