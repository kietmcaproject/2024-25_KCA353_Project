// CarBooking.js
import React from 'react';

const CarBooking = ({ car = {} }) => {
  // Default car data
  const defaultCar = {
    name: 'Toyota Corolla',
    rentalPrice: 50,
    location: 'Los Angeles, CA',
    imageUrl: 'https://www.istockphoto.com/photo/3d-illustration-of-generic-compact-white-car-front-side-view-gm1150931120-311738229?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fthings%2Fcar&utm_medium=affiliate&utm_source=unsplash&utm_term=Car+Images+%26+Pictures%3A%3Aaffiliate-collections%3Acontrol',
  };

  // Use provided car data or fallback to default data
  const { name, rentalPrice, location, imageUrl } = {
    ...defaultCar,
    ...car,
  };

  const handleBook = () => {
    alert(`Booking car: ${name}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700">
          Rental Price: <span className="font-semibold">${rentalPrice}</span> / day
        </p>
        <p className="text-gray-700 mb-4">
          Location: <span className="font-semibold">{location}</span>
        </p>
        <button
          onClick={handleBook}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default CarBooking;