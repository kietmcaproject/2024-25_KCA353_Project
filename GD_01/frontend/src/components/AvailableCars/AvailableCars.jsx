import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");

  const loggedIn = localStorage.getItem("jwtToken");

  const navigate = useNavigate()

  const cities = [
                  "Delhi","Mumbai","Bangalore","Chennai","Kolkata","Hyderabad","Gurugram","Pune",
                  "Ahmedabad","Jaipur","Chandigarh","Surat","Lucknow","Noida","Ghaziabad","Indore",
                  "Nagpur","Vadodara","Agra","Varanasi","Bhopal","Faridabad"
                ];

  useEffect(() => {
    axios
      .get("http://localhost:8787/api/v2/cars/available-cars")
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const filtered = cars.filter((car) =>
        car.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [selectedCity, cars]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const bookCar = (carID) => {
     if(loggedIn){
      navigate(`/car-details/${carID}`);
     }
     else{
      navigate('/login')
     }
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-[5%]">
      <div className="mb-6 flex justify-between py-4">
        <h1 className="text-3xl font-bold mb-8  text-gray-500">Available Cars</h1>
        <div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md w-64"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCity && filteredCars.length === 0 && (
        <p className="text-center text-red-500 font-semibold mt-6">
          No Car available on this Location.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={car.img}
              alt={car.carname}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.carname}</h2>
              <p className="text-gray-600">
                {car.brand} | {car.model} | {car.year}
              </p>
              <p className="text-gray-800 font-semibold text-lg">
                ₹{car.pricePerDay} / day
              </p>
              <p className="text-gray-500">Location: {car.location}</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => bookCar(car._id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
