import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";
import Navbar from "../Components/Navbar";

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/prediction");
    }, 3000); // 3 seconds delay before navigating
  };

  return (
    <div className="home-container">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Know Your Soil, Grow with SoilCarbon AI</h1>
          <p>"Unlock Soil’s Potential: Predict, Preserve, and Prosper with Smart Carbon Insights!" 🌱🔍</p>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading, please wait...</p>
            </div> 
          ) : (
            <button onClick={handleGetStarted} className="get-started-btn">
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
