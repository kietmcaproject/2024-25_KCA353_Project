import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp.jsx";
// import LogIn from "./Pages/LogIn/LogIn";
import LogIn from "./Pages/LogIn/LogIn.jsx";
// import EventPage from "./Pages/Events/EventPage";
// import CreateEvent from "./Pages/CreateEvent/CreateEvent";
// import Contact from "./Component/Contact us/Contact";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ChangeEvents from "./Pages/ChangeEvent/ChangeEvent.jsx";
import CreateEvent from "./Pages/CreateEvent/CreateEvent.jsx";
import ListedEvents from "./Pages/ListedEvents/ListedEvents.jsx";
import EditEventForm from "./Pages/EditEventPage/EditEventForm.jsx";
import Registrations from "./Pages/Registrations/Registrations.jsx";
import CreateTeamEvent from "./Pages/CreateTeamEvent/CreateTeamEvent.jsx";
import ListedTeamEvents from "./Pages/ListedTeamEvents/ListedTeamEvents.jsx";
import TeamRegistrations from "./Pages/TeamRegistrations/TeamRegistrations.jsx";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      console.log("bye");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/events" element={<ListedEvents />}></Route>
        <Route path="/team-events" element={<ListedTeamEvents />}></Route>
        <Route path="/change-events" element={<ChangeEvents />}></Route>
        <Route path="/create-event" element={<CreateEvent />}></Route>
        <Route path="/create-team-event" element={<CreateTeamEvent />}></Route>
        <Route path="/admin/events/edit/:eventId" element={<EditEventForm />} />
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/registrations" element={<Registrations />}></Route>
        <Route
          path="/team-registrations"
          element={<TeamRegistrations />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
