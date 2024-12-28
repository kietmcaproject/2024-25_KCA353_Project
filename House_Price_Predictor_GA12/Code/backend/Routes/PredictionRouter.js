
const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();
const { spawn } = require('child_process');
const SavedPrediction = require('../Models/predictions');
const {savePrediction}  = require('../Controllers/predictionController');
const authenticateToken = require('../Middlewares/AuthenticateToken');
const PredictionModel = require('../Models/predictions.js');

router.post('/save', authenticateToken, savePrediction);


router.get('/predictions', authenticateToken, async (req, res) => {
    const userId = req.userId; // Extracted from JWT in middleware
  
    try {
      const predictions = await PredictionModel.find({ userId });
      res.status(200).json(predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// router.post('/save', async (req, res) => {
//     const { userId, location, bhk, bath, area, predictedPrice, date } = req.body;
         
//     if (!area || !bhk || !location || !predictedPrice) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }
  
//     try {
//       const newPrediction = new SavedPrediction({
//         userId,
//         location,
//         bhk,
//         bath,
//         area,
//         predictedPrice,
//         date,
//       });
  
//       await newPrediction.save();
//       res.status(200).json({ message: 'Prediction saved successfully!' });
//     } catch (err) {
      
//       res.status(500).json(err);
//     }
//   });

router.get('/locations', (req, res) => {
    const pythonProcess = spawn('python', ['./python/get_locations.py']);

    pythonProcess.stdout.on('data', (data) => {
        const locations = JSON.parse(data.toString());
        res.json(locations);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
        res.status(500).json({ message: 'Error fetching locations' });
    });
});

router.post('/', (req, res) => {
    const { location, bhk, area } = req.body;

    // Ensure inputs are provided
    if (!location || !bhk || !area) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Spawn the Python process
    const pythonProcess = spawn('python', ['./python/predict.py', location, bhk, area]);

    // Collect data from the Python script
    pythonProcess.stdout.on('data', (data) => {
        const prediction = data.toString().trim();
        res.json({ price: prediction });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
        res.status(500).json({ message: 'Error processing request' });
    });
});




module.exports = router;