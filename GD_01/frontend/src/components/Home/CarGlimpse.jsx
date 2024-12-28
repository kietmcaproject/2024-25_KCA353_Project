import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarGlimpse = () => {
  const [cars, setCars] = useState([]);
  const visibleCars = 8; // Adjust number of visible cars to 8

  useEffect(() => {
    // Fetch cars data from the API
    axios.get('http://localhost:8787/api/v2/cars/available-cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-4">
        {cars.slice(0, visibleCars).map(car => (
          <div key={car._id} className="min-w-[250px] bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={car.img} alt={car.carname} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{car.carname}</h2>
              <p className="text-sm text-gray-600">{car.brand} - {car.model} ({car.year})</p>
              <p className="text-sm text-gray-500">Location: {car.location}</p>
              <p className="text-sm font-bold text-gray-800">₹{car.pricePerDay}/day</p>
            </div>
          </div>
        ))}
      </div>

              <Link
          className="mt-4 text-blue-500 hover:underline block text-center"
          to="/available-cars"
        >
          View More
        </Link>
      
    </div>
  );
};

export default CarGlimpse;
