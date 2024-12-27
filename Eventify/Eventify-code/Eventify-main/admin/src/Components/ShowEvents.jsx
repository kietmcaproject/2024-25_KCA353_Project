// import React, { useEffect, useState } from "react";

// const ShowEvents = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch event data from the backend API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         let response = await fetch("http://localhost:5000/api/v1/events", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           method: "GET",
//         }); // Make sure this API is running
//         response = await response.json();
//         console.log(response);
//         setEvents(response.events);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6">Events</h1>
//       {events.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
//             >
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
//                 <p className="text-gray-600 mb-2">{event.description}</p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Type:</strong> {event.eventType || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Start Date:</strong>{" "}
//                   {new Date(event.date).toLocaleDateString() || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>End Date:</strong>{" "}
//                   {new Date(event.endDate).toLocaleDateString() || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Time:</strong> {event.startTime} - {event.endTime}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Location:</strong> {event.location || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Capacity:</strong> {event.capacity || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Organizer:</strong> {event.organizerName || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Contact:</strong> {event.contactMobileNo || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   <strong>Email:</strong> {event.contactEmail || "N/A"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No events found</p>
//       )}
//     </div>
//   );
// };

// export default ShowEvents;

import React, { useEffect, useState } from "react";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/events`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Debugging API response
        console.log("API Response:", data);

        // Ensure `events` key exists in response
        if (data && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.warn("Unexpected API response format:", data);
          setError("Unexpected response format from the server.");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  {event.eventName || "Unnamed Event"}
                </h2>
                <p className="text-gray-600 mb-2">
                  {event.description || "No description available."}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Type:</strong> {event.eventType || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Start Date:</strong>{" "}
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>End Date:</strong>{" "}
                  {event.endDate
                    ? new Date(event.endDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Time:</strong>{" "}
                  {event.startTime && event.endTime
                    ? `${event.startTime} - ${event.endTime}`
                    : "N/A"}
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

export default ShowEvents;
