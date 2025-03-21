import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">SoilCarbon AI</div>
      <nav className="navbar-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/prediction">Prediction</Link></li>
          <li><Link to="/about us">About Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
