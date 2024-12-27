
import React from "react";

const FullScreenModal = ({ teamEvent, onClose }) => {
  const {
    eventName,
    description,
    eventType,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    maxTeamSize,
    minTeamSize,
    maxTeams,
    organizerName,
    contactMobileNo,
    contactEmail,
    rules,
    imageUrl,
  } = teamEvent;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner clicks
      >
        <button
          className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full focus:outline-none transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Event Title */}
        <h3 className="text-3xl font-extrabold text-yellow-300 mb-6 text-center">
          {eventName}
        </h3>

        {/* Event Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
          />
        )}

        {/* Event Description */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white underline mb-2">
            Event Description
          </h4>
          <p className="text-gray-200 leading-relaxed">{description}</p>
        </div>

        {/* Event Details */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white underline mb-2">
            Event Details
          </h4>
          <p className="text-gray-300 mb-1">Type: {eventType}</p>
          <p className="text-gray-300 mb-1">
            Start Date: {new Date(startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-300 mb-1">
            End Date: {new Date(endDate).toLocaleDateString()}
          </p>
          <p className="text-gray-300 mb-1">
            Time: {startTime} - {endTime}
          </p>
          <p className="text-gray-300 mb-1">Location: {location}</p>
          <p className="text-gray-300 mb-1">
            Team Size: {minTeamSize} - {maxTeamSize} members
          </p>
          <p className="text-gray-300">Max Teams Allowed: {maxTeams}</p>
        </div>

        {/* Event Rules */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white underline mb-2">
            Event Rules
          </h4>
          <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
            {rules}
          </p>
        </div>

        {/* Organizer Information */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white underline mb-2">
            Organizer Information
          </h4>
          <p className="text-gray-300 mb-1">Organizer: {organizerName}</p>
          <p className="text-gray-300 mb-1">Contact: {contactMobileNo}</p>
          <p className="text-gray-300">Email: {contactEmail}</p>
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="mt-4 bg-yellow-300 text-purple-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
