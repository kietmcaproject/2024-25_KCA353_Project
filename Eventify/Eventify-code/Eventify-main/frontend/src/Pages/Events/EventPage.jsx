// export default EventPage;
import React, { useEffect, useState } from "react";
import Navbar from "../../Component/Navbar";
import EventCard from "./EventCard";
import Loader from "../../Component/Loader/Loader";

const EventPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [regOrCancelReg, setRegOrCancelReg] = useState(true); // Trigger re-fetch after registration
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const onRegOrCancelRegHandler = () => {
    setRegOrCancelReg(!regOrCancelReg); // This will trigger the effect to update registered events
  };

  const onloading = (value) => {
    setIsLoading(value);
  };

  // Fetch all events
  const getEvents = async () => {
    let result = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/events`, {
      method: "GET",
      headers: {
        contentType: "application/json",
      },
    });
    result = await result.json();
    setEvents(result.events);
    setIsLoading(false);
  };

  // Fetch registered events for the user
  const getRegisteredEvents = async () => {
    let result = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/registered-events`,
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setRegisteredEvents(result.registeredEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Fetch registered events after registration/cancellation
  useEffect(() => {
    getRegisteredEvents();
  }, [regOrCancelReg]); // When registration status changes, re-fetch the registered events

  // Show loading state while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Categorize events as upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) <= currentDate
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold mb-12 text-center uppercase tracking-wider text-yellow-300">
          Upcoming Events
        </h1>

        {/* Upcoming Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-lg">No upcoming events available.</p>
          ) : (
            upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onLoadingHandler={onloading}
                registeredEvents={registeredEvents}
                onRegOrCancelReg={onRegOrCancelRegHandler}
                isPast={false}
              />
            ))
          )}
        </div>

        {/* Past Events Section */}
        <h1 className="text-4xl font-extrabold mt-16 mb-12 text-center uppercase tracking-wider text-yellow-300">
          Past Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.length === 0 ? (
            <p className="text-center text-lg">No past events available.</p>
          ) : (
            pastEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onLoadingHandler={onloading}
                registeredEvents={registeredEvents}
                onRegOrCancelReg={onRegOrCancelRegHandler}
                isPast={true}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventPage;
