import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# 1️⃣ Load the dataset
file_path = "soc.csv"  # Ensure this file is in the same directory as this script
df = pd.read_csv(file_path)

# 2️⃣ Clean column names (remove spaces & lowercase everything)
df.columns = df.columns.str.strip().str.lower()
print("Updated Dataset Columns:", df.columns.tolist())  # Debugging step

# 3️⃣ Set target variable (Check actual column name)
target = "soc (%)"  # Update if different in your dataset

# Ensure target column exists
if target not in df.columns:
    raise ValueError(f"Target column '{target}' not found! Available columns: {df.columns.tolist()}")

# 4️⃣ Separate features (X) and target variable (y)
features = df.drop(columns=[target])  # Input features
labels = df[target]  # Output/Target variable

# 5️⃣ Split dataset into training (80%) and testing (20%)
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

print(f"Training data size: {X_train.shape}")
print(f"Testing data size: {X_test.shape}")

# 6️⃣ Train the Machine Learning Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("✅ Model training completed!")

# 7️⃣ Evaluate Model Performance
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"🔍 Model Mean Squared Error (MSE): {mse:.4f}")

# 8️⃣ Save the trained model
model_filename = "organic_carbon_model.pkl"
joblib.dump(model, model_filename)
print(f"✅ Model saved as '{model_filename}'")
