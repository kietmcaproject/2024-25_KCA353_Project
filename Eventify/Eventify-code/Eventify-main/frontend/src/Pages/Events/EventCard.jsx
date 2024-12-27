// import React, { useEffect, useState } from "react";
// const EventCard = ({
//   event,
//   onLoadingHandler,
//   registeredEvents,
//   onRegOrCancelReg,
// }) => {
//   const [isRegistered, setIsRegistered] = useState(false);
//   console.log(registeredEvents);
//   const {
//     _id,
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
//     imageUrl,
//   } = event;

//   // console.log(registeredEvents);
//   const checkRegistration = () => {
//     let flag = 0;
//     if (registeredEvents != []) {
//       registeredEvents.forEach((registration) => {
//         if (registration.event_id == _id) {
//           // console.log("registered");
//           // setIsRegistered(true);
//           flag = 1;
//           // return;
//         }
//       });
//     }
//     if (flag == 1) {
//       setIsRegistered(true);
//     } else {
//       setIsRegistered(false);
//     }
//   };

//   useEffect(() => {
//     checkRegistration();
//   }, [registeredEvents]);

//   const registerHandler = async (e) => {
//     console.log(e.target.value);
//     onLoadingHandler(true);
//     const token = localStorage.getItem("token");
//     const data = {
//       eventId: e.target.value,
//     };
//     let response = await fetch("http://localhost:5000/api/v1/register-event", {
//       method: "POST",
//       headers: {
//         token: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     response = await response.json();
//     console.log(response);
//     onLoadingHandler(false);
//     alert("Successfully registered!");
//     onRegOrCancelReg();
//   };

//   const cancelRegistrationHandler = async (e) => {
//     console.log(e.target.value);
//     onLoadingHandler(true);
//     const token = localStorage.getItem("token");
//     const data = {
//       eventId: e.target.value,
//     };
//     let response = await fetch(
//       "http://localhost:5000/api/v1/cancel-registration",
//       {
//         method: "POST",
//         headers: {
//           token: token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     response = await response.json();
//     console.log(response);
//     onLoadingHandler(false);
//     alert("Event Registration has been cancelled!");
//     console.log("registration cancelled");
//     // setIsRegistered(true);
//     onRegOrCancelReg();
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* <img
//         src={imageUrl}
//         alt={eventName}
//         className="w-full h-48 object-cover"
//       /> */}
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-purple-600 mb-2">
//           {eventName}
//         </h3>
//         <p className="text-gray-700 mb-2">{description}</p>
//         <p className="text-gray-600 mb-1">Type: {eventType}</p>
//         <p className="text-gray-600 mb-1">
//           Date: {new Date(date).toLocaleDateString()}
//         </p>
//         <p className="text-gray-600 mb-1">
//           Time: {startTime} - {endTime}
//         </p>
//         <p className="text-gray-600 mb-1">Location: {location}</p>
//         <p className="text-gray-600 mb-1">Capacity: {capacity}</p>
//         <p className="text-gray-600 mb-1">Organizer: {organizerName}</p>
//         <p className="text-gray-600 mb-1">Contact: {contactMobileNo}</p>
//         <p className="text-gray-600 mb-1">Email: {contactEmail}</p>

//         {isRegistered === false ? (
//           <button
//             value={_id}
//             onClick={registerHandler}
//             className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
//           >
//             Register Now
//           </button>
//         ) : (
//           <button
//             value={_id}
//             onClick={cancelRegistrationHandler}
//             className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
//           >
//             Cancel Registration
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React, { useState, useEffect } from "react";
import FullScreenModal from "./FullScreenModal";

const EventCard = ({
  event,
  onLoadingHandler,
  registeredEvents,
  onRegOrCancelReg,
  isPast,
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [registrationsCount, setRegistrationsCount] = useState(
    event.registrationsCount
  ); // Track registrations count

  const {
    _id,
    eventName,
    description,
    eventType,
    date,
    startTime,
    endTime,
    location,
    capacity,
    imageUrl,
  } = event;

  useEffect(() => {
    // Check if user is already registered
    const isRegisteredEvent = registeredEvents.some(
      (registration) => registration.event_id === _id
    );
    setIsRegistered(isRegisteredEvent);
  }, [registeredEvents, _id]);

  const registerHandler = async (e) => {
    onLoadingHandler(true);
    const token = localStorage.getItem("token");
    const data = { eventId: e.target.value };

    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/register-event`,
      {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    onLoadingHandler(false);
    setRegistrationsCount((prevCount) => prevCount + 1); // Increment registration count on frontend
    alert("Successfully registered!");
    onRegOrCancelReg();
  };

  const cancelRegistrationHandler = async (e) => {
    onLoadingHandler(true);
    const token = localStorage.getItem("token");
    const data = { eventId: e.target.value };

    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/cancel-registration`,
      {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    onLoadingHandler(false);
    setRegistrationsCount((prevCount) => prevCount - 1); // Decrement registration count on frontend
    alert("Event Registration has been cancelled!");
    onRegOrCancelReg();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">
          {eventName}
        </h3>

        {/* Display Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        {/* Event Description and View More Toggle */}
        <p className="text-gray-700 mb-2">
          {viewMore ? description : `${description.slice(0, 100)}...`}
        </p>
        <button
          onClick={() => setViewMore(!viewMore)}
          className="text-blue-500 underline mb-2"
        >
          {viewMore ? "View Less" : "View More"}
        </button>

        {/* View More Modal for Event Details */}
        {viewMore && (
          <FullScreenModal event={event} onClose={() => setViewMore(false)} />
        )}

        <p className="text-gray-600 mb-1">Type: {eventType}</p>
        <p className="text-gray-600 mb-1">
          Date: {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1">
          Time: {startTime} - {endTime}
        </p>
        <p className="text-gray-600 mb-1">Location: {location}</p>
        <p className="text-gray-600 mb-1">Capacity: {capacity}</p>

        {/* Display the number of registrations */}
        <p className="text-gray-600 mb-1">
          Registrations: {registrationsCount}
        </p>
        {!isPast &&
          (isRegistered ? (
            <button
              value={_id}
              onClick={cancelRegistrationHandler}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Cancel Registration
            </button>
          ) : (
            <button
              value={_id}
              onClick={registerHandler}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Register Now
            </button>
          ))}
      </div>
    </div>
  );
};

export default EventCard;

// import React, { useState, useEffect } from "react";

// const TeamEventCard = ({
//   event,
//   registeredTeams = [],
//   onRegOrCancelReg,
//   isPast = false,
//   onLoadingHandler,
// }) => {
//   // Return early if the `event` prop is undefined or null
//   if (!event) {
//     return <div>Loading event details...</div>;
//   }

//   const [isRegistered, setIsRegistered] = useState(false);
//   const [viewMore, setViewMore] = useState(false);
//   const [isSeatsAvailable, setIsSeatsAvailable] = useState(true);

//   // Destructure `event` properties safely
//   const {
//     _id,
//     eventName,
//     description,
//     eventType,
//     date,
//     startTime,
//     endTime,
//     location,
//     capacity,
//     imageUrl,
//   } = event;

//   useEffect(() => {
//     const isRegisteredTeam = registeredTeams.some(
//       (registration) => registration.team_id === _id
//     );
//     setIsRegistered(isRegisteredTeam);

//     if (registeredTeams.length >= capacity) {
//       setIsSeatsAvailable(false);
//     }
//   }, [registeredTeams, _id, capacity]);

//   const registerHandler = async (e) => {
//     if (!isSeatsAvailable) {
//       alert("No more seats available.");
//       return;
//     }

//     onLoadingHandler(true);
//     const token = localStorage.getItem("token");
//     const data = { eventId: e.target.value };

//     let response = await fetch(
//       `${import.meta.env.VITE_API_URL}/api/v1/register-event`,
//       {
//         method: "POST",
//         headers: {
//           token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     response = await response.json();
//     onLoadingHandler(false);

//     if (response.success) {
//       alert("Successfully registered!");
//       onRegOrCancelReg();
//     } else {
//       alert(response.message);
//     }
//   };

//   const cancelRegistrationHandler = async (e) => {
//     onLoadingHandler(true);
//     const token = localStorage.getItem("token");
//     const data = { eventId: e.target.value };

//     let response = await fetch(
//       `${import.meta.env.VITE_API_URL}/api/v1/cancel-registration`,
//       {
//         method: "POST",
//         headers: {
//           token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     response = await response.json();
//     onLoadingHandler(false);

//     if (response.success) {
//       alert("Registration canceled!");
//       onRegOrCancelReg();
//     } else {
//       alert(response.message);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
//       <div className="p-6 bg-white rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold text-purple-700 mb-3">
//           {eventName}
//         </h3>

//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt={eventName}
//             className="w-full h-48 object-cover rounded-lg mb-4 border-4 border-indigo-300"
//           />
//         )}

//         <p className="text-gray-800 mb-2">
//           {viewMore ? description : `${description.slice(0, 100)}...`}
//         </p>
//         <button
//           onClick={() => setViewMore(!viewMore)}
//           className="text-blue-600 underline mb-4 hover:text-blue-800 transition-all"
//         >
//           {viewMore ? "View Less" : "View More"}
//         </button>

//         <div className="space-y-2 text-gray-600">
//           <p>
//             <span className="font-semibold text-indigo-600">Type:</span>{" "}
//             {eventType}
//           </p>
//           <p>
//             <span className="font-semibold text-purple-600">Date:</span>{" "}
//             {new Date(date).toLocaleDateString()}
//           </p>
//           <p>
//             <span className="font-semibold text-green-600">Time:</span>{" "}
//             {startTime} - {endTime}
//           </p>
//           <p>
//             <span className="font-semibold text-pink-600">Location:</span>{" "}
//             {location}
//           </p>
//           <p>
//             <span className="font-semibold text-yellow-600">Capacity:</span>{" "}
//             {capacity}
//           </p>
//         </div>

//         <p className="text-gray-700 mb-1">
//           Registrations: {registeredTeams.length}/{capacity}
//         </p>

//         {!isSeatsAvailable && (
//           <p className="text-red-500 text-sm mb-4 font-bold">
//             No more seats available.
//           </p>
//         )}

//         {!isPast &&
//           (isRegistered ? (
//             <button
//               value={_id}
//               onClick={cancelRegistrationHandler}
//               disabled={!isSeatsAvailable}
//               className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//             >
//               Cancel Registration
//             </button>
//           ) : (
//             <button
//               value={_id}
//               onClick={registerHandler}
//               disabled={!isSeatsAvailable}
//               className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//             >
//               Register Now
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default TeamEventCard;
