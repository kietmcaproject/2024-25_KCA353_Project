import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Phone,
  Mail,
} from "lucide-react";

const EventType = [
  { value: "Curricular", label: "Curricular" },
  { value: "Extra Curricular", label: "Extra Curricular" },
  { value: "Workshop", label: "Workshop" },
  { value: "Club Event", label: "Club Event" },
  { value: "Other", label: "Other" },
];

export default function CreateEventForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Update end date min value when start date changes
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // If end date is before new start date, update it
    if (endDate && endDate < newStartDate) {
      setEndDate(newStartDate);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/create-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      response = await response.json();
      console.log(response);
      if (response.success) {
        window.location.href = "/events";
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-purple-600 text-center mb-8">
            Create New Event
          </h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Calendar className="text-purple-600" />
                <input
                  name="eventName"
                  type="text"
                  placeholder="Event Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-purple-600" />
                <select
                  name="eventType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                >
                  <option value="">Select Event Type</option>
                  {EventType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-start space-x-2 col-span-2">
                <Calendar className="text-purple-600 mt-2" />
                <textarea
                  name="description"
                  placeholder="Event Description"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="text-purple-600" />
                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="text-purple-600" />
                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    name="endDate"
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="text-purple-600" />
                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    Start Time
                  </label>
                  <input
                    name="startTime"
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-purple-600" />
                <div className="w-full">
                  <label className="block text-sm text-gray-600 mb-1">
                    End Time
                  </label>
                  <input
                    name="endTime"
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-purple-600" />
                <input
                  name="location"
                  type="text"
                  placeholder="Event Location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-purple-600" />
                <input
                  name="capacity"
                  type="number"
                  min="5"
                  placeholder="Total Event Capacity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <User className="text-purple-600" />
                <input
                  name="organizerName"
                  type="text"
                  placeholder="Event Organizer Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-purple-600" />
                <input
                  name="contactMobileNo"
                  type="tel"
                  placeholder="Event Organizer Contact No"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-purple-600" />
                <input
                  name="contactEmail"
                  type="email"
                  placeholder="Event Organizer Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-purple-700 transition duration-300"
            >
              Create Event
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
