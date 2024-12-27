// EditEventPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    organizerName: "",
    contactMobileNo: "",
    contactEmail: "",
  });
  const navigate = useNavigate();

  // Fetch the event data when the component loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/events/${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setEventData(data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(eventData),
        }
      );
      response = await response.json();
      console.log(response);

      if (response.success == "true") {
        navigate("/events");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-8 text-[#9333ea]">
        Edit Event
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Event Type</label>
          <input
            type="text"
            name="eventType"
            value={eventData.eventType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date.split("T")[0]} // Format for input type date
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
            required
          />
        </div>

        {/* Start Time and End Time in a Single Row */}
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 font-medium">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 font-medium">End Time</label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={eventData.capacity}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Organizer Name
          </label>
          <input
            type="text"
            name="organizerName"
            value={eventData.organizerName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Contact Mobile No
          </label>
          <input
            type="tel"
            name="contactMobileNo"
            value={eventData.contactMobileNo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={eventData.contactEmail}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#9333ea] text-white px-4 py-2 rounded-lg hover:bg-[#7a2cc3] transition duration-200"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
