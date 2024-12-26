import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the XLSX library
import './HodDashboard.css';

const HodDashboard = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchPendingApplications();
  }, [id]);

  const fetchPendingApplications = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/leave/${id}/pending`);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
    }
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedApplications(applications.map(app => app._id));
    } else {
      setSelectedApplications([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (applicationId) => {
    if (selectedApplications.includes(applicationId)) {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId));
    } else {
      setSelectedApplications([...selectedApplications, applicationId]);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      await Promise.all(
        selectedApplications.map(applicationId =>
          axios.put(`http://localhost:5000/api/leave/${action}/${applicationId}`)
        )
      );
      setApplications(applications.filter(app => !selectedApplications.includes(app._id)));
      alert(`Applications ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
      setSelectedApplications([]);
      setSelectAll(false);
    } catch (error) {
      console.error(`Error ${action}ing applications:`, error);
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
      'Department': app.department,
      'Hostel':app.hostel
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pending Applications');
    XLSX.writeFile(wb, 'Pending_Applications.xlsx');
  };

  const handleApprove = async (applicationId) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/accept/${applicationId}`);
      setApplications(applications.filter(app => app._id !== applicationId)); // Remove approved app from the list
      alert('Application approved successfully!');
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/reject/${applicationId}`);
      setApplications(applications.filter(app => app._id !== applicationId)); // Remove rejected app from the list
      alert('Application rejected successfully!');
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  return (
    <div className="hod">
      <div className="hod-dashboard">
      <header className="welcome-header">
        <img src="https://th.bing.com/th/id/R.72f859a9e59a10a83f86d7b82a59620e?rik=G3gY0VZKcHTOjg&riu=http%3a%2f%2fkoha.kiet.edu%2fopac-tmpl%2fbootstrap%2fimages%2flogo.png&ehk=JJRCJyIBhT6iVygrEaV4mmiYwHYUVWnrrrGYn4%2bsGm0%3d&risl=&pid=ImgRaw&r=0" height="50px" width="50px" alt="Illustration" className="logo"/>
        <h1>Welcome!</h1>
        {/* <p className="date-text">Today is {new Date().toLocaleDateString()}</p> */}
      <h2 className="yellow">Pending Leave Applications</h2>
      </header>

      {/* Link to Reports Page */}
    
      <div className="table-controls-ar">
      <Link to={`/hod/${id}/reports`} className="reports-link">
        View Reports
      </Link>
        <button onClick={handleExportToExcel}>
          Export to Excel
        </button>
        </div>
      <div className="table-controls">
      <button className= "accept"onClick={() => handleBulkAction('accept')} disabled={!selectedApplications.length}>
          Accept
        </button>
        <button  className= "decline" onClick={() => handleBulkAction('reject')} disabled={!selectedApplications.length}>
          Reject
        </button>
       
      </div>
      <table className="application-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Location</th>
            <th>Attendance</th>
            <th>Department</th>
            <th>Hostel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(app._id)}
                    onChange={() => handleCheckboxChange(app._id)}
                  />
                </td>
                <td>{app.studentName}</td>
                <td>{app.reason}</td>
                <td>{new Date(app.fromDate).toLocaleDateString()}</td>
                <td>{new Date(app.toDate).toLocaleDateString()}</td>
                <td>{app.location}</td>
                <td>{app.attendance}</td>
                <td>{app.department}</td>
                <td>{app.hostel}</td>
                <td>
                  <button onClick={() => handleApprove(app._id)}>Accept</button>
                  <button onClick={() => handleReject(app._id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No pending applications at the moment.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default HodDashboard;
