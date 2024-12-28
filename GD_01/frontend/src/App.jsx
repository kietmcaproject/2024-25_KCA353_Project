import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Contact from "./components/Contact";
import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage";
import Location from "./components/Location/Location";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/PrivateRoute/Profile/Profile";
import Host from "./components/PrivateRoute/Host/Host";
import SignUp from "./components/SignUp/SignUp";
import CarDetails from "./components/PrivateRoute/CarDetails/CarDetails";
import AvailableCars from "./components/AvailableCars/AvailableCars";
import Footer from "./components/Home/Footer";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/host" element={<Host/>}/>
          <Route path="/car-details/:carID" element={<CarDetails/>}/>
        </Route>

        <Route path="/available-cars" element={<AvailableCars/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
