import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CarDetails() {
  const { carID } = useParams();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState(null);
  const [hostDetails, setHostDetails] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carResponse = await axios.get(`http://localhost:8787/api/v2/cars/car-details/${carID}`);
        setCarDetails(carResponse.data);
        
        // Fetch host details using userID from car details
        const userID = carResponse.data.userID;
        const userResponse = await axios.get(`http://localhost:8787/api/v1/users/user-details/${userID}`);
        setHostDetails(userResponse.data.user);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchCarDetails();
  }, [carID]);

  const handleEdit = () => {
    // Navigate to edit page (You can adjust this route as per your application structure)
    navigate(`/edit-car/${carID}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8787/api/v2/cars/delete/${carID}`);
      if (response.status === 200) {
        alert("Car deleted successfully.");
        navigate("/home"); // Redirect to home page after delete
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Error deleting the car. Please try again.");
    }
  };

  if (!carDetails || !hostDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Car Details */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{carDetails.carname}</h2>
          <img
            src={carDetails.img}
            alt={carDetails.carname}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div className="text-gray-700 space-y-2">
            <p><strong>Brand:</strong> {carDetails.brand}</p>
            <p><strong>Registration Number:</strong> {carDetails.regNo}</p>
            <p><strong>Year:</strong> {carDetails.year}</p>
            <p><strong>Price per Day:</strong> ₹{carDetails.pricePerDay}</p>
            <p><strong>Seats:</strong> {carDetails.seats}</p>
            <p><strong>Fuel Type:</strong> {carDetails.fuelType}</p>
            <p><strong>Transmission:</strong> {carDetails.transmission}</p>
            <p><strong>Location:</strong> {carDetails.location}</p>
          </div>
          {/* Buttons in the same line */}
          <div className="mt-6 flex space-x-4">
            <button onClick={handleEdit} className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
              Edit
            </button>
            <button onClick={handleDelete} className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">
              Delete
            </button>
            <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Book Now
            </button>
          </div>
        </div>

        {/* Right Side: Hosted by Section */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hosted by</h3>
          <img
            src={hostDetails.avatar}
            alt={hostDetails.fullname}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <div className="text-gray-700 space-y-2 text-center">
            <p><strong>Name:</strong> {hostDetails.fullname}</p>
            <p><strong>Email:</strong> {hostDetails.email}</p>
            <p><strong>License No:</strong> {hostDetails.licenseNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
