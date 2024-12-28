import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./savePred.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";





function SavedPredictions() {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
    
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        
        
      }, []);

    const goHome = () => {
     navigate('/home');
    }
    
    const handleLogout = (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
    
        toast.success("User Loggedout");
    
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      };
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/predict/predictions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        toast.error('Failed to load predictions!');
      }
    };

    fetchPredictions();
  }, []);

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
  
    // Get the day, month, year, hours, minutes, and seconds
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if single digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Return in the desired format: DD/MM/YYYY - HH:MM:SS
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="container mt-5 mx-auto">

<nav className="navbar navbar-expand-lg navbar-dark bg-purple fixed-top">
  <div className="container-fluid">
    {/* Left side - House Price Predictor */}
    {/* <a className="navbar-brand text-black" href="#">House Price Predictor</a> */}
    
    {/* Right side - Username, Logout, Home buttons */}
    <div className="d-flex ml-auto align-items-center">
     
      <button className="btn btn-outline-black home-btn" onClick={goHome}>Home</button>
    </div>
  </div>
</nav>

       
     

      <h3>Your Saved Predictions</h3>
      {error && <p>{error}</p>}
      {predictions.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Location</th>
              <th>BHK</th>
              <th>Bathrooms</th>
              <th>Area (sqft)</th>
              <th>Predicted Price</th>
              <th>Predicted At</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <tr key={prediction._id}>
                <td>{prediction.location}</td>
                <td>{prediction.bhk}</td>
                <td>{prediction.bath}</td>
                <td>{prediction.area}</td>
                <td>{prediction.predictedPrice}</td>
                <td>{formatDateTime(prediction.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No predictions found!</p>
      )}
      <ToastContainer />

      

    </div>
  );
}

export default SavedPredictions;
