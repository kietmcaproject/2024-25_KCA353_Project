import React, { useState, useEffect } from "react";
import FullScreenModal from "./FullScreenModal";
// import FullScreenModal from "./FullScreenModal";

const TeamEventCard = ({
  teamEvent,
  onLoadingHandler,
  registeredTeams,
  onRegOrCancelReg,
  isPast,
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [registrationsCount, setRegistrationsCount] = useState(
    teamEvent.registrationsCount
  );
  const [isSeatsAvailable, setIsSeatsAvailable] = useState(true);
  const [canModifyRegistration, setCanModifyRegistration] = useState(true);

  const {
    _id,
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
    contactEmail,
    contactMobileNo,
    organizerName,
    rules,
    imageUrl,
  } = teamEvent;

  //   useEffect(() => {
  //     const isRegisteredTeam = registeredTeams.some(
  //       (registration) => registration.team_id === _id
  //     );
  //     setIsRegistered(isRegisteredTeam);

  //     if (registrationsCount >= maxTeams) {
  //       setIsSeatsAvailable(false);
  //     }

  //     const eventStartDateTime = new Date(`${startDate} ${startTime}`);
  //     const currentTime = new Date();
  //     const timeDifference = eventStartDateTime - currentTime;

  //     if (timeDifference <= 5 * 60 * 60 * 1000) {
  //       setCanModifyRegistration(false);
  //     }
  //   }, [
  //     registeredTeams,
  //     _id,
  //     registrationsCount,
  //     maxTeams,
  //     startDate,
  //     startTime,
  //   ]);

  const registerHandler = async (e) => {
    //   if (!isSeatsAvailable || !canModifyRegistration) {
    //     alert("Registration is closed for this event.");
    //     return;
    //   }

    //   onLoadingHandler(true);
    //   const token = localStorage.getItem("token");
    //   const data = { teamId: e.target.value };

    //   let response = await fetch("http://localhost:5000/api/v1/register-team", {
    //     method: "POST",
    //     headers: {
    //       token: token,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   response = await response.json();
    //   onLoadingHandler(false);
    //   setRegistrationsCount((prevCount) => prevCount + 1);
    //   alert("Successfully registered!");
    //   onRegOrCancelReg();
    // };

    // const cancelRegistrationHandler = async (e) => {
    //   if (!canModifyRegistration) {
    //     alert("Cancellation is not allowed.");
    //     return;
    //   }

    //   onLoadingHandler(true);
    //   const token = localStorage.getItem("token");
    //   const data = { teamId: e.target.value };

    //   let response = await fetch(
    //     "http://localhost:5000/api/v1/cancel-team-registration",
    //     {
    //       method: "POST",
    //       headers: {
    //         token: token,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );
    //   response = await response.json();
    //   onLoadingHandler(false);
    //   setRegistrationsCount((prevCount) => prevCount - 1);
    //   alert("Team registration has been cancelled!");
    onRegOrCancelReg(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">
          {eventName}
        </h3>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={eventName}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <p className="text-gray-700 mb-2">
          {viewMore ? description : `${description.slice(0, 100)}...`}
        </p>
        <button
          onClick={() => setViewMore(!viewMore)}
          className="text-blue-500 underline mb-2"
        >
          {viewMore ? "View Less" : "View More"}
        </button>

        {viewMore && (
          <FullScreenModal
            teamEvent={teamEvent}
            onClose={() => setViewMore(false)}
          />
        )}

        <p className="text-gray-600 mb-1">Event Type: {eventType}</p>
        <p className="text-gray-600 mb-1">
          Start Date: {new Date(startDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1">
          End Date: {new Date(endDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1">
          Time: {startTime} - {endTime}
        </p>
        <p className="text-gray-600 mb-1">Location: {location}</p>
        <p className="text-gray-600 mb-1">Max Teams: {maxTeams}</p>
        <p className="text-gray-600 mb-1">
          Team Size: {minTeamSize} - {maxTeamSize} members
        </p>
        <p className="text-gray-600 mb-1">Contact Email: {contactEmail}</p>
        <p className="text-gray-600 mb-1">Contact Mobile: {contactMobileNo}</p>
        <p className="text-gray-600 mb-1">Organizer: {organizerName}</p>
        <p className="text-gray-600 mb-1">Rules: {rules}</p>

        <p className="text-gray-600 mb-1">
          Registrations: {registrationsCount}
        </p>

        {!isSeatsAvailable && (
          <p className="text-red-500 text-sm mb-4">
            No more team slots available
          </p>
        )}
        {!canModifyRegistration && (
          <p className="text-red-500 text-sm mb-4">
            Registration and cancellation are closed for this event.
          </p>
        )}

        <button
          value={_id}
          onClick={registerHandler}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
        >
          Register Now
        </button>

        {/* {!isPast &&
          (isRegistered ? (
            <button
              value={_id}
              onClick={cancelRegistrationHandler}
              disabled={!canModifyRegistration || !isSeatsAvailable}
              className={`mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
                !canModifyRegistration || !isSeatsAvailable
                  ? "bg-gray-500 cursor-not-allowed"
                  : ""
              }`}
            >
              {canModifyRegistration ? "Cancel Registration" : "Cannot Cancel"}
            </button>
          ) : (
            <button
              value={_id}
              onClick={registerHandler}
              disabled={!canModifyRegistration || !isSeatsAvailable}
              className={`mt-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
                !canModifyRegistration || !isSeatsAvailable
                  ? "bg-gray-500 cursor-not-allowed"
                  : ""
              }`}
            >
              {canModifyRegistration
                ? isSeatsAvailable
                  ? "Register Now"
                  : "Slots Full"
                : "Cannot Register"}
            </button>
          ))} */}
      </div>
    </div>
  );
};

export default TeamEventCard;
