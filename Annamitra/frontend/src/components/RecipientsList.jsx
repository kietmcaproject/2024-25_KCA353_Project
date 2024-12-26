import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confirmation from "./RecipientPopup";
import MapComponent from "./MapComponent"; // Import the map component

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function RecipientsList() {
  const [donations, setDonations] = useState([]);
  const [currentElement, setCurrentElement] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/lists/recipients-list`, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDonations(data.donationRequests);
      } catch (error) {
        console.error("Error in fetching:", error);
      }
    };

    if (!isPopupOpen) {
      fetchDonations();
      const interval = setInterval(fetchDonations, 1000);
      return () => clearInterval(interval);
    }
  }, [isPopupOpen]);

  function handleClick(element) {
    setCurrentElement(element);
    setPopupOpen(true);
  }

  return (
    <div className="py-4 px-12">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold  my-6 ">
          Food Donations You Can Accept
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/recipientRequest")}
        >
          Custom Request
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {donations.map((element) => (
          <Recipient
            key={element.id}
            element={element}
            onRequestClick={handleClick}
          />
        ))}
      </div>

      {isPopupOpen && (
        <Confirmation
          element={currentElement}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}

const Recipient = ({ element, onRequestClick }) => {
  const address = `${element.addressFrom.street}, ${element.addressFrom.city}, ${element.addressFrom.state} ${element.addressFrom.postalcode}, ${element.addressFrom.country}`;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col hover:scale-105 transition-transform">
      {/* Map component */}
      <div className="h-32 overflow-hidden w-full">
        <MapComponent key={address} address={address} />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{element.description}</h4>
        <p className="text-sm text-gray-600 mb-2">Serves: {element.serves}</p>
        <p className="text-sm text-gray-600 mb-2">
          Date: {new Date(element.date).toLocaleDateString("en-GB")}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Address: {element.addressFrom.city}, {element.addressFrom.postalcode}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Category: {element.category}
        </p>

        <div className="flex justify-self-end">
          <button
            onClick={() => onRequestClick(element)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
