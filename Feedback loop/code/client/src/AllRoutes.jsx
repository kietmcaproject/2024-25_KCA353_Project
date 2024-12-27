import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import Questions from "./pages/Questions/Questions";
import UserProfile from "./pages/UserProfile/UserProfile";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import About from "./components/About/About";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Questions" element={<Questions />} />
      <Route path="/Users/:id" element={<UserProfile />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Questions/:id" element={<DisplayQuestion />} />
      <Route path="/About" element={<About/>} />

    
   
    </Routes>
  );
};

export default AllRoutes;
