import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VotingPage from "./VotingPage.jsx";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Vote from "./Vote.jsx";
import Result from "./Result.jsx";
import Logout from "./Logout.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Home" element={<Home />} />         
          <Route path="/VotingPage" element={<VotingPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Vote" element={<Vote />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
