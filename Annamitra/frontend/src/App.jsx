import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login";
import Annamitra from "./components/Home.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import DonationsList from "./components/DonationsList.jsx";
import RecipientsList from "./components/RecipientsList.jsx";
import RecipientRequest from "./components/RecipientRequest.jsx";
import DonationRequest from "./components/DonationRequest.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Community from "./components/Community.jsx";
import Profile from "./components/Profile.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/Annamitra" />} />
                    <Route path="/Annamitra" element={<Annamitra />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/LogIn" element={<Login />} />
                    <Route path="/donations-list" element={<DonationsList />} />
                    <Route
                        path="/recipients-list"
                        element={<RecipientsList />}
                    />
                    <Route
                        path="/donationRequest"
                        element={<DonationRequest />}
                    />
                    <Route
                        path="/recipientRequest"
                        element={<RecipientRequest />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/edit-profile" element={<Profile />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
