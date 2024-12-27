import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline"; // Importing the edit icon

const EditEvent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch event data from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/events`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        ); // Make sure this API is running
        response = await response.json();
        console.log(response);
        setEvents(response.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle edit icon click
  const handleEdit = (eventId) => {
    navigate(`/admin/events/edit/${eventId}`); // Navigate to the event edit page with event ID
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 relative"
            >
              {/* Edit Icon in the Top-Right Corner */}
              <div className="absolute top-3 right-3 cursor-pointer">
                <PencilSquareIcon
                  className="h-6 w-6 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(event._id)}
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Type:</strong> {event.eventType || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString() || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Time:</strong> {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Location:</strong> {event.location || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Capacity:</strong> {event.capacity || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Organizer:</strong> {event.organizerName || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Contact:</strong> {event.contactMobileNo || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Email:</strong> {event.contactEmail || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No events found</p>
      )}
    </div>
  );
};

export default EditEvent;
