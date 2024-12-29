import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the XLSX library
import './GuardDashboard.css';

const GuardDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications(filter);
  }, [filter]);

  const fetchApplications = async (status) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/guard`;
      if (status !== 'all') {
        url += `?status=${status}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(applications.map(app => ({
      'Name': app.studentName,
      'Reason': app.reason,
      'From': new Date(app.fromDate).toLocaleDateString(),
      'To': new Date(app.toDate).toLocaleDateString(),
      'Location': app.location,
      'Attendance': app.attendance,
      'Hostel':app.hostel,
      'Status': app.status,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, 'Applications.xlsx');
  };

  return (
    <div className="dashboard-container">
       <header className="welcome-header">
        <img src="https://th.bing.com/th/id/R.72f859a9e59a10a83f86d7b82a59620e?rik=G3gY0VZKcHTOjg&riu=http%3a%2f%2fkoha.kiet.edu%2fopac-tmpl%2fbootstrap%2fimages%2flogo.png&ehk=JJRCJyIBhT6iVygrEaV4mmiYwHYUVWnrrrGYn4%2bsGm0%3d&risl=&pid=ImgRaw&r=0" height="50px" width="50px" alt="Illustration" className="logo"/>
        <h1>Welcome!</h1>
        {/* <p className="date-text">Today is {new Date().toLocaleDateString()}</p> */}
   
      <h2 className= "title">Guard Dashboard</h2>
      </header>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''} >All</button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Approved</button>
        <button onClick={() => setFilter('rejected')} className={filter === 'rejected' ? 'active' : ''}>Rejected</button>
      </div>
      <div className="table-controls">
        <button onClick={handleExportToExcel}>
          Export to Excel
        </button>
      </div>
      <div className="applications-container">
        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length > 0 ? (
          <table className="application-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Location</th>
                <th>Attendance</th>
                <th>Hostel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.studentName}</td>
                  <td>{app.reason}</td>
                  <td>{new Date(app.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(app.toDate).toLocaleDateString()}</td>
                  <td>{app.location}</td>
                  <td>{app.attendance}</td>
                  <td>{app.hostel}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default GuardDashboard;
