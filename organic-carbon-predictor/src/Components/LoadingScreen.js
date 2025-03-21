import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ delay = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoading) return null; // Hide loading screen after delay

  return (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingScreen;
