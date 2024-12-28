import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Host = () => {
  const [carData, setCarData] = useState({
    carname: '',
    regNo: '',
    brand: '',
    year: '',
    pricePerDay: '',
    seats: '',
    fuelType: '',
    transmission: '',
    location: '',
    image: '', 
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData")) || {}; // Get user data from localStorage with fallback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ 
      ...carData, 
      [name]: value 
    });
  };

  const uploadOnCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile); // Append file to FormData

    try {
      const response = await axios.post('http://localhost:8787/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url; // Get the URL from the backend response
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await uploadOnCloudinary(file);
      setCarData({ ...carData, image: imageUrl }); // Set image URL to the state
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image, please try again');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const carDetails = {
      carname: carData.carname,
      regNo: carData.regNo,
      brand: carData.brand,
      year: carData.year,
      pricePerDay: carData.pricePerDay,
      seats: carData.seats,
      fuelType: carData.fuelType,
      transmission: carData.transmission,
      location: carData.location,
      img: carData.image, // Use the uploaded image URL
      userID: user._id,
    };

    try {
      const response = await axios.post('http://localhost:8787/api/v2/cars/add-car', carDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Car added successfully:', response.data);
      alert("Car added successfully");
      navigate('/'); // Navigate to the home page after successful submission
    } catch (error) {
      console.error('Error adding car:', error);
      alert("Error adding car. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-12">
      <div className="bg-white p-8 shadow-md w-full max-w-3xl h-screen lg:h-auto overflow-y-auto lg:overflow-visible">
        <h2 className="text-3xl font-bold mb-8">Car Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Car Name */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">CAR NAME</label>
            <input
              type="text"
              name="carname"
              value={carData.carname}
              onChange={handleChange}
              placeholder="Enter car name"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">REGISTRATION NUMBER</label>
            <input
              type="text"
              name="regNo"
              value={carData.regNo}
              onChange={handleChange}
              placeholder="Enter registration number"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Car Brand */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">BRAND</label>
            <input
              type="text"
              name="brand"
              value={carData.brand}
              onChange={handleChange}
              placeholder="Enter car brand"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">YEAR</label>
            <input
              type="number"
              name="year"
              value={carData.year}
              onChange={handleChange}
              placeholder="Enter car year"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price per Day */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">PRICE PER DAY</label>
            <input
              type="number"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleChange}
              placeholder="Enter price per day"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">SEATS</label>
            <input
              type="number"
              name="seats"
              value={carData.seats}
              onChange={handleChange}
              placeholder="Enter number of seats"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">FUEL TYPE</label>
            <input
              type="text"
              name="fuelType"
              value={carData.fuelType}
              onChange={handleChange}
              placeholder="Enter fuel type"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">TRANSMISSION</label>
            <input
              type="text"
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
              placeholder="Enter transmission type"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">LOCATION</label>
            <input
              type="text"
              name="location"
              value={carData.location}
              onChange={handleChange}
              placeholder="Enter car location"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Car Image */}
          <div>
            <label className="block text-gray-600 my-2 font-semibold">CAR IMAGE</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Adding Car...' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Host;
