// src/components/PredictionForm.js
import React, { useState, useEffect } from "react";
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {  handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import "./PredictionForm.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function PredictionForm() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedLocation, setSelectedLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [area, setArea] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    
    const token = localStorage.getItem('token'); // or use context/state
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId || decodedToken._id;
    // console.log(userId);
    setUserId(userId);
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("User Loggedout");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  function convertToReadableFormat(amount) {
    if (amount >= 10000000) {
      // Convert to crores
      return (amount / 10000000).toFixed(2) + " crore";
    } else if (amount >= 100000) {
      // Convert to lakhs
      return (amount / 100000).toFixed(2) + " lakh";
    } else if (amount >= 1000) {
      // Convert to thousands
      return (amount / 1000).toFixed(2) + " thousand";
    } else {
      // Return the original amount in rupees
      return amount + " rupees";
    }
  }

  // Fetch unique locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/predict/locations"
        );
        setLocations(response.data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };
    fetchLocations();
  }, []);

  const validateInputs = () => {
    let isValid = true;

    if (bhk === "" || bhk <= 0 || bhk > 4) {
      toast.error("BHK must be between 1 and 4");
      isValid = false;
    }

    if (bath === "" || bath <= 0 || bath > 4) {
      toast.error("Bathrooms must be between 1 and 4");
      isValid = false;
    }

    if (area === "" || area < 500 || area > 10000) {
      toast.error("Area must be between 500 and 10,000 sqft");
      isValid = false;
    }

    if (selectedLocation === "") {
      toast.error("Please select a location");
      isValid = false;
    }

    return isValid;
  };
  

 
  

  

  const handleSavePrediction = async (e) => {
     
    e.preventDefault();
 
    if (!price) {
      toast.error('Please predict a price before saving!');
      return;
    }

    const decodedToken = jwtDecode(localStorage.getItem("token"));
    console.log("Decoded Token:", decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
    console.error("Token has expired");
     }


    const predictionData = {
      location: selectedLocation,
      bhk,
      bath,
      area,
      predictedPrice: convertToReadableFormat(price),
    };


    try {
      // Make the POST request using Axios
      
      console.log(localStorage.getItem('token'))

      const response = await axios.post(
        'http://localhost:8080/api/predict/save',
        predictionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using JWT for auth
          },
        }
      );

      if (response.status === 200 || 201) {
        toast.success('Prediction saved successfully frontend!');
      } else {
        toast.error('Failed to save prediction.');
      }
      console.log(response);

    } catch (error) {
      console.log(error);
      toast.error('An error occurred while saving the prediction frontend ERR !');
    }
  
    
  };

   

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }
     
    toast.success('computing price, please wait');

    try {
      const response = await axios.post("http://localhost:8080/api/predict", {
        location: selectedLocation,
        bhk,
        area,
      });

      if(response.data.price)
      {
        toast.success('Price computed successfully ');
      }

      console.log(response.data.price);
      setPrice(response.data.price);
      setError("");
    } catch (err) {
      setError("Error getting prediction. Please check your input.");
      console.error(err);
    }
  };



  const prevPredictions = () => {
   
    navigate('/predictions');

  };

  return (
<div className="container-fluid p-0 mx-auto">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-purple w-100 fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand text-black" href="#">House Price Predictor</a>
                    <div className="d-flex ml-auto">
                        <span className="navbar-text text-black mr-3">
                            {loggedInUser}
                        </span>
                        <button className="btn btn-outline-black me-3" onClick={handleLogout}>Logout</button>
                        <button className="btn btn-outline-black " onClick={prevPredictions}>predictions</button>
                    </div>
                </div>
            </nav>

            {/* Prediction Form */}
            <div className="row d-flex justify-content-center mt-5 pt-5">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                    <h3>House Price Predictor</h3>
                    <p className="black-text">Just describe your real estate requirements<br /> and predict the price of your dream home!!</p>
                    <div className="card">
                        <h5 className="text-center mb-4">Please provide your real estate requirements</h5>
                        <br />
                        <form className="form-card" >
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">Location<span className="text-danger"> *</span></label>
                                    <select className="selectpicker form-control" id="location"
                                        name="location" required value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} >
                                        <option value="" disabled>Select location</option>
                                        {locations.map((location, index) => (
                                            <option key={index} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">BHK<span className="text-danger"> *</span></label>
                                    <input type="number" id="bhk" name="bhk" placeholder="Enter BHK" value={bhk} onChange={(e) => setBhk(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">No of Bathrooms<span className="text-danger"> *</span></label>
                                    <input type="number" id="bath" name="bath" placeholder="Enter No of Bathrooms" value={bath} onChange={(e) => setBath(e.target.value)} required />
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">Area<span className="text-danger"> *</span></label>
                                    <input type="number" id="area" name="area" placeholder="Enter Area in Sqft" value={area} onChange={(e) => setArea(e.target.value)} required />
                                </div>
                            </div>

                            <br />
                            <div className="row justify-content-end">
                                <div className="form-group col-sm-12">
                                    <button type="submit" className="btn btn-primary ms-3" onClick={handleSubmit}>Predict Price</button>
                
                                    <button type="submit" className="btn btn-primary ms-3" onClick={handleSavePrediction}>Save Prediction</button>
                                </div>
                            </div>
                        </form>

                        <br />

                        <div className="col-md-12" style={{ textAlign: 'center' }}>
                            <h3>
                                {price && <h2>Predicted Price: {convertToReadableFormat(price)}</h2>}
                                {error && <p>{error}</p>}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
  );
}

export default PredictionForm;
