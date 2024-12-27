import React, { useEffect, useState } from "react";
import Navbar from "../../Component/Navbar";
import Loader from "../../Component/Loader/Loader";
import TeamEventCard from "./TeamEventCard";
import RegistrationForm from "./RegistrationForm";

const TeamEventPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [regOrCancelReg, setRegOrCancelReg] = useState(true); // Trigger re-fetch after registration
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const formHandler = () => {
    setIsOpen(!isOpen);
  };

  const onRegOrCancelRegHandler = (id) => {
    setEventId(id);
    setIsOpen(true);
    setRegOrCancelReg(!regOrCancelReg); // This will trigger the effect to update registered events
  };

  const onloading = (value) => {
    setIsLoading(value);
  };

  // Fetch all events
  const getEvents = async () => {
    let result = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/team-events`,
      {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      }
    );
    result = await result.json();
    setEvents(result.teamEvents);
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
          contentType: "application/json",
        },
      }
    );
    result = await result.json();
    setRegisteredEvents(result.registeredEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getRegisteredEvents();
  }, [regOrCancelReg]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold mb-12 text-center uppercase tracking-wider text-yellow-300">
          Upcoming Team Events
        </h1>

        {/* Upcoming Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <p className="text-center text-lg">No upcoming events available.</p>
          ) : (
            events.map((event, index) => (
              <TeamEventCard
                key={index}
                teamEvent={event}
                onLoadingHandler={onloading}
                registeredEvents={registeredEvents}
                onRegOrCancelReg={onRegOrCancelRegHandler}
              />
            ))
          )}
        </div>

        {isOpen && (
          <RegistrationForm eventId={eventId} handleForm={formHandler} />
        )}
      </main>

      {/* Full-Width Footer */}
      <footer className="w-full bg-purple-800 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TeamEventPage;
