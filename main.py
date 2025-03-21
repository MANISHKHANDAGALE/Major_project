from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

# Load the trained model
model = joblib.load("organic_carbon_model.pkl")

# Define the FastAPI app
app = FastAPI()

# ✅ Enable CORS to allow frontend requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any frontend (use ["http://localhost:3000"] for more security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define input data format (must have 60 features)
class SoilData(BaseModel):
    features: list

# API Endpoint for predictions
@app.post("/predict")
def predict(data: SoilData):
    # Ensure input has exactly 60 features
    if len(data.features) != 60:
        raise HTTPException(status_code=400, detail=f"Input must have exactly 60 features, but got {len(data.features)}.")

    # Convert input list to numpy array
    input_data = np.array(data.features).reshape(1, -1)

    # Predict using the trained model
    prediction = model.predict(input_data)[0]

    # Return the prediction as JSON
    return {"organic_carbon_prediction": prediction}

