import React, { useEffect, useState } from "react";

const ShowTeamEvents = () => {
  const [events, setEvents] = useState([]);

  // Fetch event data from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/team-events`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        ); // Make sure this API is running
        response = await response.json();
        console.log(response);
        setEvents(response.teamEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Team Events</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Type:</strong> {event.eventType || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Start Date:</strong>{" "}
                  {new Date(event.startDate).toLocaleDateString() || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>End Date:</strong>{" "}
                  {new Date(event.endDate).toLocaleDateString() || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Time:</strong> {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Location:</strong> {event.location || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Maximum Number of Teams:</strong>{" "}
                  {event.maxTeams || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Team Size :</strong> {event.minTeamSize} -{" "}
                  {event.maxTeamSize}
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

export default ShowTeamEvents;
// import React, { useEffect, useState } from "react";
// import { FaInfoCircle, FaRegClock, FaMapMarkerAlt } from "react-icons/fa"; // Icons for more info, clock, and location

// // Function to generate random background colors for cards
// const getRandomCardColor = () => {
//   const colors = [
//     "bg-indigo-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
//     "bg-red-500", "bg-purple-500", "bg-teal-500", "bg-orange-500",
//     "bg-pink-500", "bg-gray-500"
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const ShowTeamEvents = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch event data from the backend API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         let response = await fetch("http://localhost:5000/api/v1/team-events", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           method: "GET",
//         });
//         response = await response.json();
//         console.log(response);
//         setEvents(response.teamEvents);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
//         Team Events
//       </h1>
//       {events.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className={`${getRandomCardColor()} text-white shadow-xl rounded-xl overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 duration-300`}
//             >
//               <div className="p-6">
//                 {/* Event Name */}
//                 <h2 className="text-2xl font-semibold mb-4">{event.eventName}</h2>

//                 {/* Event Details */}
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center space-x-2 text-sm text-white">
//                     <FaRegClock />
//                     <p>
//                       <strong>Start:</strong> {new Date(event.startDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-white">
//                     <FaRegClock />
//                     <p>
//                       <strong>End:</strong> {new Date(event.endDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-white">
//                     <FaMapMarkerAlt />
//                     <p>
//                       <strong>Location:</strong> {event.location || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Event Description */}
//                 <p className="text-sm text-white mb-4">
//                   {event.description || "No description available."}
//                 </p>

//                 {/* Organizer Details */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-white mb-2">Organizer Details</h3>
//                   <p className="text-sm text-white">
//                     <strong>Name:</strong> {event.organizerName || "N/A"}
//                   </p>
//                   <p className="text-sm text-white">
//                     <strong>Contact:</strong> {event.contactMobileNo || "N/A"}
//                   </p>
//                   <p className="text-sm text-white">
//                     <strong>Email:</strong> {event.contactEmail || "N/A"}
//                   </p>
//                 </div>

//                 {/* Additional Information */}
//                 <div>
//                   <p className="text-sm text-white">
//                     <strong>Maximum Teams:</strong> {event.maxTeams || "N/A"}
//                   </p>
//                   <p className="text-sm text-white">
//                     <strong>Team Size:</strong> {event.minTeamSize} - {event.maxTeamSize}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg">No events found</p>
//       )}
//     </div>
//   );
// };

// export default ShowTeamEvents;
