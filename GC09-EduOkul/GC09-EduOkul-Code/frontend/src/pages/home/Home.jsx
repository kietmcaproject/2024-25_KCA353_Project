import React from 'react'
import "./home.css";
import { useNavigate } from "react-router-dom";
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-learning Platform</h1>
          <p>Let us learn and excel together</p>
          <button onClick={() => navigate("/courses")} className="common-btn">
            Get Started
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  )
}

export default Home





