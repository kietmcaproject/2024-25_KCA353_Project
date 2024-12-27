import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StatusPage.css';

const StatusPage = () => {
  const { id } = useParams(); // Get student ID from URL
  const [status, setStatus] = useState('');
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null); // Store application being edited

  useEffect(() => {
    if (status) {
      fetchApplications(status);
    }
  }, [status]);

  const fetchApplications = async (status) => {
    try {
      const endpoint = status
        ? `http://localhost:5000/api/leave/status/${id}?status=${status}`
        : `http://localhost:5000/api/leave/status/${id}`; // No status filter for "All"
      const { data } = await axios.get(endpoint);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleEditClick = (app) => setEditingApplication(app);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1); // Set maximum date to 1 year from today
    const maxDateFormatted = maxDate.toISOString().split("T")[0];

    // Validation for 'From Date' and 'To Date'
    if (editingApplication.fromDate < today) {
      alert("Leave cannot start in the past.");
      return;
    }

    if (editingApplication.toDate < editingApplication.fromDate) {
      alert("The 'To Date' should be after the 'From Date'.");
      return;
    }

    if (editingApplication.fromDate > maxDateFormatted || editingApplication.toDate > maxDateFormatted) {
      alert("Leave dates cannot exceed one year from today.");
      return;
    }

    // Check for overlapping leave applications
    const isOverlapping = applications.some((existingApplication) => {
      const existingFromDate = new Date(existingApplication.fromDate);
      const existingToDate = new Date(existingApplication.toDate);
      const newFromDate = new Date(editingApplication.fromDate);
      const newToDate = new Date(editingApplication.toDate);

      return (
        (newFromDate <= existingToDate && newToDate >= existingFromDate) &&
        existingApplication._id !== editingApplication._id // Avoid comparing the same application
      );
    });

    if (isOverlapping) {
      alert("You cannot apply for leave on overlapping dates.");
      return;
    }

    try {
      // Update the endpoint to use the new route '/update/:id'
      await axios.put(`http://localhost:5000/api/leave/update/${editingApplication._id}`, editingApplication);
      alert('Application updated successfully!');
      fetchApplications(status); // Refresh the list
      setEditingApplication(null); // Close the form
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDelete = async (appId) => {
    try {
      await axios.delete(`http://localhost:5000/api/leave/delete/${appId}`);
      alert('Application deleted successfully!');
      fetchApplications(status); // Refresh the list
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="status-page">
      <h2>View Application Status</h2>
      <label>Filter by Status: </label>
      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <div>
        {applications.length > 0 ? (
          <ul>
            {applications.map((app) => (
              <li key={app._id}>
                <strong>Reason:</strong> {app.reason} <br />
                <strong>From:</strong> {new Date(app.fromDate).toLocaleDateString()} <br />
                <strong>To:</strong> {new Date(app.toDate).toLocaleDateString()} <br />
                <strong>Status:</strong> {app.status} <br />
                {status === 'pending' && (
                  <>
                    <button className="button button-edit" onClick={() => handleEditClick(app)}>✏️ </button>
                    <button className="button button-edit" onClick={() => handleDelete(app._id)}>🗑️</button>
                  </>
                )}
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found for the selected status.</p>
        )}
      </div>

      {editingApplication && (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Application</h3>
          <label>Reason: </label>
          <input
            type="text"
            name="reason"
            value={editingApplication.reason}
            onChange={handleEditChange}
          />
          <label>From Date: </label>
          <input
            type="date"
            name="fromDate"
            value={editingApplication.fromDate}
            onChange={handleEditChange}
            min={new Date().toISOString().split("T")[0]} // today's date
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]} // 1 year from today
          />
          <label>To Date: </label>
          <input
            type="date"
            name="toDate"
            value={editingApplication.toDate}
            onChange={handleEditChange}
            min={editingApplication.fromDate} // 'To Date' must be after 'From Date'
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]} // 1 year from today
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingApplication(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default StatusPage;
