import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { id } = useParams();
  
  const [application, setApplication] = useState({
    name: '',
    fromDate: '',
    toDate: '',
    reason: '',
    location: '',
    attendance: '',
    timings: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [existingApplications, setExistingApplications] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); // Set maximum date to 1 year from today
  const maxDateFormatted = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudentData(data);
        setApplication((prevState) => ({
          ...prevState,
          name: data.name,
          fromDate: today
        }));
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    
    const fetchExistingApplications = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/leave/${id}`);
        setExistingApplications(data);
      } catch (error) {
        console.error('Error fetching existing leave applications:', error);
      }
    };

    fetchStudentData();
    fetchExistingApplications();
  }, [id, today]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (application.fromDate < today) {
      alert("Leave cannot start in the past.");
      return;
    }

    if (application.toDate < application.fromDate) {
      alert("The 'To Date' should be after the 'From Date'.");
      return;
    }

    if (application.fromDate > maxDateFormatted || application.toDate > maxDateFormatted) {
      alert("Leave dates cannot exceed one year from today.");
      return;
    }

    const isOverlapping = existingApplications.some(existingApplication => {
      const existingFromDate = new Date(existingApplication.fromDate);
      const existingToDate = new Date(existingApplication.toDate);
      const newFromDate = new Date(application.fromDate);
      const newToDate = new Date(application.toDate);

      return (newFromDate <= existingToDate && newToDate >= existingFromDate);
    });

    if (isOverlapping) {
      alert("You cannot apply for leave on overlapping dates.");
      return;
    }

    if (!studentData) {
      alert('Student data not loaded. Please try again.');
      return;
    }

    try {
      const leaveApplicationData = {
        studentId: studentData.userId,
        department: studentData.department,
        hodId: studentData.hodId,
        fromDate: application.fromDate,
        toDate: application.toDate,
        reason: application.reason,
        location: application.location,
        attendance: application.attendance,
        timings: application.timings,
        status: 'pending',
        applicationDate: new Date().toISOString(),
      };

      await axios.post(`http://localhost:5000/api/leave/submit`, leaveApplicationData);

      setApplication({
        name: '',
        fromDate: '',
        toDate: '',
        reason: '',
        location: '',
        attendance: '',
        timings: ''
      });
      setShowForm(false);
      alert('Leave application submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave application:', error.response || error);
      alert(error.response?.data?.message || 'Error submitting leave application. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="welcome-header">
        <img src="https://th.bing.com/th/id/R.72f859a9e59a10a83f86d7b82a59620e?rik=G3gY0VZKcHTOjg&riu=http%3a%2f%2fkoha.kiet.edu%2fopac-tmpl%2fbootstrap%2fimages%2flogo.png&ehk=JJRCJyIBhT6iVygrEaV4mmiYwHYUVWnrrrGYn4%2bsGm0%3d&risl=&pid=ImgRaw&r=0" height="50px" width="50px" alt="Illustration" className="logo"/>
        <h1>Welcome, {studentData?.name || 'Student'}!</h1>
        <p className="date-text">Today is {new Date().toLocaleDateString()}</p>
      </header>

      <nav className="dashboard-nav">
        <Link to="/feedback" className="nav-button">Add Feedback</Link>
        <Link to={`/student/${id}/status`} className="nav-button">View Status</Link>        
        <button className="nav-button" onClick={() => setShowForm(true)}>Apply for Leave</button>
      </nav>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className = "pos">
            <button className="close-button" onClick={() => setShowForm(false)}>✖</button>
            <h2 className="fix-green">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="leave-form">
            
              <div className="form-group">
                <label>Name:</label>
                <input className="input-data" type="text" name="name" value={application.name} onChange={handleChange} disabled />
              </div>
              <div className="form-group">
                <label>From Date:</label>
                <input className="input-data" type="date" name="fromDate" value={application.fromDate} onChange={handleChange} min={today} max={maxDateFormatted} required />
              </div>
              <div className="form-group">
                <label>To Date:</label>
                <input className="input-data" type="date" name="toDate" value={application.toDate} onChange={handleChange} min={application.fromDate} max={maxDateFormatted} required />
              </div>
              <div className="form-group">
                <label>Reason:</label>
                <input className="input-data" type="text" name="reason" value={application.reason} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input className="input-data" type="text" name="location" value={application.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Current Attendance:</label>
                <input className="input-data" type="text" name="attendance" value={application.attendance} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Timings:</label>
                <input className="input-data" type="text" name="timings" value={application.timings} onChange={handleChange} required />
              </div>
              <div className="form-buttons">
                <button type="submit" className="sub-button">Submit</button>
                <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
          
            </form>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
