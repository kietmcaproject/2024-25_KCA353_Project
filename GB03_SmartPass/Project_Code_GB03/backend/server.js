// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const studentRoutes = require('./routes/studentRoutes');
const guardNWardenRoutes = require('./routes/guardNWardenRoutes');
const reportRoutes = require('./routes/reportRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import feedbackRoutes
const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/warden', guardNWardenRoutes);
app.use('/api/guard', guardNWardenRoutes);
app.use('/api/reports', reportRoutes); 
app.use('/api/feedback', feedbackRoutes); // Use feedbackRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
