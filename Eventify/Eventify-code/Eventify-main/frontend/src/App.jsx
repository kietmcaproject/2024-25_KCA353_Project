import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import EventPage from "./Pages/Events/EventPage";
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import Contact from "./Component/Contact us/Contact";
import "./App.css";
import TeamEventPage from "./Pages/TeamEventPage/TeamEventPage";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("hello world");
      navigate("/login");
    } else {
      console.log("bye");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/events" element={<EventPage />}></Route>
        <Route path="/team-events" element={<TeamEventPage />}></Route>
        <Route path="/create-event" element={<CreateEvent />}></Route>
      </Routes>
    </>
  );
}

export default App;
