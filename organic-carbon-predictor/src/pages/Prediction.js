import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiSandsOfTime } from "react-icons/gi"; // Import hourglass icon
import "./Prediction.css";

function Prediction() {
  const [features, setFeatures] = useState(new Array(60).fill(""));
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState(new Array(60).fill(false));

  // Handle input change
  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);

    const newInvalidFields = [...invalidFields];
    newInvalidFields[index] = value === "";
    setInvalidFields(newInvalidFields);
  };

  // Auto-fill with random values
  const fillRandomValues = () => {
    const randomValues = Array.from({ length: 60 }, () => (Math.random() * 100).toFixed(2));
    setFeatures(randomValues);
    setInvalidFields(new Array(60).fill(false)); // Reset invalid fields when auto-filling
  };

  // Submit for prediction
  const handleSubmit = async () => {
    const emptyFields = features.map((value) => value === "");

    if (emptyFields.includes(true)) {
      setInvalidFields(emptyFields);
      alert("Please fill all 60 input fields before predicting.");
      return;
    }

    try {
      setError("");
      setPrediction(null);
      setLoading(true);
      setLoadingStep(1); // Start first step

      let step = 1;
      const stepInterval = setInterval(() => {
        if (step < 4) {
          setLoadingStep((prev) => prev + 1);
          step++;
        } else {
          clearInterval(stepInterval);
        }
      }, 2000); // Change text every 2 seconds

      setTimeout(async () => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/predict", {
            features: features.map(Number),
          });
          setPrediction(response.data.organic_carbon_prediction);
          setLoading(false);
        } catch (err) {
          setError("Error: Ensure all fields are filled with valid numbers.");
          setLoading(false);
        }
      }, 6000); // Total 6 seconds for loading before result
    } catch (err) {
      setError("Error: Something went wrong.");
      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <GiSandsOfTime className="hourglass-icon" />
        <div className="loading-steps">
          {loadingStep >= 1 && <p>🟡 Collecting data...</p>}
          {loadingStep >= 2 && <p>🟠 Processing data...</p>}
          {loadingStep >= 3 && <p>🟢 Predicting result...</p>}
        </div>
      </div>
    );
  }

  // Result Screen
  if (prediction !== null) {
    return (
      <div className="result-container">
        <h1>Prediction Result</h1>
        <div className="result-box">
          <p>Predicted SOC: <strong>{prediction.toFixed(4)}</strong></p>
        </div>
        <button onClick={() => setPrediction(null)} className="back-btn">🔄 Go Back</button>
      </div>
    );
  }

  // Input Form
  return (
    <div className="prediction-container">
      <h1>SOC Prediction</h1>
      <p>Enter 60 values or auto-fill:</p>
      <button onClick={fillRandomValues} className="random-btn">🔄 Fill Random</button>

      <div className="input-grid">
        {features.map((value, index) => (
          <input 
            key={index} 
            type="number" 
            value={value} 
            onChange={(e) => handleChange(index, e.target.value)} 
            placeholder={`Feature ${index + 1}`} 
            className={invalidFields[index] ? "error" : ""}
          />
        ))}
      </div>

      <button onClick={handleSubmit} className="predict-btn" disabled={loading}>
        Predict
      </button>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default Prediction;
