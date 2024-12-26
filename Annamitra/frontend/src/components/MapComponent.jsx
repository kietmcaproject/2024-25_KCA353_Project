import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 6.9271, // Default center, e.g., Colombo
  lng: 79.8612,
};

const MapComponent = ({ address }) => {
  console.log(address);

  const [markerPosition, setMarkerPosition] = useState(center); // Initial position
  const [locationName, setLocationName] = useState(""); // Location name for the search box
  const [isLocationFound, setIsLocationFound] = useState(true); // Flag to track if location is found

  // Function to fetch latitude and longitude based on address
  const getLocationCoordinates = async (address) => {
    const geocoder = new window.google.maps.Geocoder();

    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            resolve(results[0].geometry.location);
          } else {
            reject("Geocode failed");
          }
        });
      });

      return results;
    } catch (error) {
      console.error("Error geocoding address:", error);
      setIsLocationFound(false); // If the address is invalid, set flag to false
      return null;
    }
  };

  useEffect(() => {
    if (address) {
      // Get coordinates when address changes
      getLocationCoordinates(address).then((location) => {
        if (location) {
          setMarkerPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
          setLocationName(address); // Set location name to display
          setIsLocationFound(true); // Address found successfully
        }
      });
    }
  }, [address]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}
      libraries={["places"]}
    >
      <div>
        {isLocationFound ? (
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={markerPosition}
              zoom={13}
            >
              <Marker position={markerPosition} label={locationName} />
            </GoogleMap>
          </>
        ) : (
          <h3>Location not found. Please check the address.</h3>
        )}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
