import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const CarRental = () => {
  const [car, setCar] = useState({
    name: '',
    nameOnRC: '',
    brand: '',
    model: '',
    year: '',
    NoPlate: '',
    available: true,
    pricePerDay: '',
    seats: '',
    fuelType: '',
    transmission: '',
    images: [],
    availableDates: { from: '', to: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 3) {
      setCar({ ...car, images: files });
    } else {
      alert('You can only upload a maximum of 3 images.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Car Data Submitted:', car);
    // You can submit the car data to the backend here
  };

  return (
    <div className="container mx-auto p-4 ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 ">
        <h1 className="text-2xl font-bold mb-6">Car Information Form</h1>

        {/* Car Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Car Name</label>
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter car name"
            required
          />
        </div>

        {/* Name on RC */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name on RC</label>
          <input
            type="text"
            name="nameOnRC"
            value={car.nameOnRC}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name on RC"
            required
          />
        </div>

        {/* Brand and Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter car brand"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Model</label>
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter car model"
              required
            />
          </div>
        </div>

        {/* Year and License Plate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter manufacturing year"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">License Plate</label>
            <input
              type="text"
              name="NoPlate"
              value={car.NoPlate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter license plate number"
              required
            />
          </div>
        </div>

        {/* Price, Seats, and Fuel Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={car.pricePerDay}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price per day"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Seats</label>
            <input
              type="number"
              name="seats"
              value={car.seats}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of seats"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Fuel Type</label>
            <select
              name="fuelType"
              value={car.fuelType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Transmission */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Transmission</label>
          <select
            name="transmission"
            value={car.transmission}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Car Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Car Images (Up to 3)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {car.images.length > 3 && (
            <p className="text-red-500 mt-2">You can upload up to 3 images only!</p>
          )}
        </div>

        {/* Available Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Available From</label>
            <input
              type="date"
              name="from"
              value={car.availableDates.from}
              onChange={(e) => setCar({ ...car, availableDates: { ...car.availableDates, from: e.target.value } })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Available To</label>
            <input
              type="date"
              name="to"
              value={car.availableDates.to}
              onChange={(e) => setCar({ ...car, availableDates: { ...car.availableDates, to: e.target.value } })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Car Details
          </button>
        </div>
      </form>
    </div>
    );
  };

export default  CarRental;
