import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <img
            src={ user.avatar }
            alt="Profile Avatar"
            className="w-44 h-44 rounded-full shadow-lg border-4 border-indigo-500 object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {user?.fullname || "User Name"}
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          {user?.email || "user@example.com"}
        </p>

        <div className="text-left space-y-4 mb-10 text-gray-700">
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>License No:</strong> {user?.licenseNo}
          </p>
          <p>
            <strong>License Expiry:</strong>{" "}
            {user?.licenseExpiryDate
              ? new Date(user.licenseExpiryDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>City:</strong> {user.city}
          </p>
          <p>
            <strong>District:</strong> {user.district}
          </p>
          <p>
            <strong>State:</strong> {user.state}
          </p>
          <p>
            <strong>Pincode:</strong> {user.pincode}
          </p>
        </div>

        <div className="flex justify-around mt-8">
          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
