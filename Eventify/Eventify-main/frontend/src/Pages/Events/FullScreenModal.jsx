// FullScreenModal.js
// import React from "react";

// const FullScreenModal = ({ event, onClose }) => {
//   const {
//     eventName,
//     description,
//     eventType,
//     date,
//     startTime,
//     endTime,
//     location,
//     capacity,
//     organizerName,
//     contactMobileNo,
//     contactEmail,
//     imageUrl, // Image URL added
//   } = event;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg p-6 w-11/12 h-5/6 overflow-auto"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
//       >
//         <h3 className="text-3xl font-semibold text-purple-600 mb-4">
//           {eventName}
//         </h3>

//         {/* Display Image */}
//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt={eventName}
//             className="w-full h-64 object-cover rounded-lg mb-4"
//           />
//         )}

//         <div className="mb-4">
//           <h4 className="text-2xl font-semibold text-gray-800">
//             Event Description
//           </h4>
//           <p className="text-gray-700">{description}</p>
//         </div>

//         <div className="mb-4">
//           <h4 className="text-xl font-semibold text-gray-800">Event Details</h4>
//           <p className="text-gray-600 mb-2">Type: {eventType}</p>
//           <p className="text-gray-600 mb-2">
//             Date: {new Date(date).toLocaleDateString()}
//           </p>
//           <p className="text-gray-600 mb-2">
//             Time: {startTime} - {endTime}
//           </p>
//           <p className="text-gray-600 mb-2">Location: {location}</p>
//           <p className="text-gray-600 mb-2">Capacity: {capacity}</p>
//         </div>

//         <div className="mb-4">
//           <h4 className="text-xl font-semibold text-gray-800">
//             Organizer Information
//           </h4>
//           <p className="text-gray-600 mb-2">Organizer: {organizerName}</p>
//           <p className="text-gray-600 mb-2">Contact: {contactMobileNo}</p>
//           <p className="text-gray-600 mb-2">Email: {contactEmail}</p>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FullScreenModal;

import React from "react";

const FullScreenModal = ({ event, onClose }) => {
  const {
    eventName,
    description,
    eventType,
    date,
    startTime,
    endTime,
    location,
    capacity,
    organizerName,
    contactMobileNo,
    contactEmail,
    imageUrl, // Image URL added
  } = event;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 w-11/12 h-5/6 overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h3 className="text-4xl font-semibold text-white mb-4">{eventName}</h3>

        {/* Display Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-72 object-cover rounded-lg mb-4 shadow-lg border-4 border-indigo-300"
          />
        )}

        <div className="mb-4">
          <h4 className="text-2xl font-semibold text-yellow-200 mb-2">
            Event Description
          </h4>
          <p className="text-gray-100">{description}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-yellow-200 mb-2">
            Event Details
          </h4>
          <p className="text-gray-100 mb-2">Type: {eventType}</p>
          <p className="text-gray-100 mb-2">
            Date: {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-gray-100 mb-2">
            Time: {startTime} - {endTime}
          </p>
          <p className="text-gray-100 mb-2">Location: {location}</p>
          <p className="text-gray-100 mb-2">Capacity: {capacity}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-yellow-200 mb-2">
            Organizer Information
          </h4>
          <p className="text-gray-100 mb-2">Organizer: {organizerName}</p>
          <p className="text-gray-100 mb-2">Contact: {contactMobileNo}</p>
          <p className="text-gray-100 mb-2">Email: {contactEmail}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-indigo-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FullScreenModal;
