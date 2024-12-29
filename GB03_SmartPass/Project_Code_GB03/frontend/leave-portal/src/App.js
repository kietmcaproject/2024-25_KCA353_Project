import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HodDashboard from './HODDashboard';
import GuardDashboard from './GuardDashboard';
import WardenDashboard from './WardenDashboard';
import StudentDashboard from './StudentDashboard';
import LoginPage from './LoginPage';  // Import the Login Page
import StatusPage from './StatusPage';
import FeedbackForm from './feedback';
import Reports from './HodReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Add the LoginPage here */}
        <Route path="/hod/:id" element={<HodDashboard />} />  
        <Route path="/hod/:id/reports" element={<Reports />} />        
        <Route path="/guard" element={<GuardDashboard />} />
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/student/:id" element={<StudentDashboard />} />
        <Route path="/student/:id/status" element={<StatusPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
