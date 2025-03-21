import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import LoadingScreen from "./Components/LoadingScreen";
import AboutUs from "../src/pages/AboutUs"
function App() {
  return (
    <>
      <LoadingScreen /> {/* Loading screen appears on startup */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/about us" element={<AboutUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
