import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Include Leaflet CSS
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define the coordinates of major Indian cities
const cityData = {
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Ghaziabad: { lat: 28.6692, lng: 77.4538 },
  Delhi: { lat: 28.7041, lng: 77.1025 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
};

// Custom Marker icon
const customMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to update the map's view dynamically
const UpdateMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Location = () => {
  const [selectedCity, setSelectedCity] = useState(""); // Selected city
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default map center (India)
  const [mapZoom, setMapZoom] = useState(4); // Default zoom (India)

  // Handle city selection
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (cityData[city]) {
      setMapCenter([cityData[city].lat, cityData[city].lng]);
      setMapZoom(12); // Zoom into the selected city
    } else {
      setMapCenter([20.5937, 78.9629]); // Center the map to India
      setMapZoom(4); // Show full map of India
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-[88.5vh] shadow-lg p-4 space-y-4 lg:space-y-0 lg:space-x-4 md:px-[80px]  bg-gradient-to-r from-white to-dark">
      <div className="w-full lg:w-[50%] bg-white p-6  h-auto lg:h-[420px] flex items-center justify-center">
        <div className="w-full lg:w-[80%] bg-white p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Select Your City</h1>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="block w-full p-2 border rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-medium"
          >
            <option value="">All India</option>
            {Object.keys(cityData).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-medium text-white px-4 py-2 rounded-3xl hover:bg-dark transition duration-300 mt-4"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Map Display */}
      <div className="w-full lg:w-[50%] ">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="h-96 w-full shadow-lg"
          style={{ height: "420px" }}
        >
          {/* Dynamically update the map view */}
          <UpdateMapView center={mapCenter} zoom={mapZoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Show marker only if a city is selected */}
          {selectedCity && cityData[selectedCity] && (
            <Marker
              position={[cityData[selectedCity].lat, cityData[selectedCity].lng]}
              icon={customMarker}
            >
              <Popup>{selectedCity}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Location;
