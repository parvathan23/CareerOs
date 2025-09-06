import os
import joblib
import numpy as np

# Get the absolute base directory of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define model file paths
model_path = os.path.join(BASE_DIR, "model", "career_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "model", "vectorizer.pkl")
label_encoder_path = os.path.join(BASE_DIR, "model", "label_encoder.pkl")

# Load the trained model and transformers
try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    label_encoder = joblib.load(label_encoder_path)
except Exception as e:
    raise RuntimeError(f"❌ Error loading model files: {e}")

# ✅ Function 1: Predict the **top-1** career
def predict_career(subject_input: str):
    """
    Predicts the most likely career based on subject input.
    Returns a list with one predicted career.
    """
    if not subject_input:
        return ["Invalid input: No subject provided"]

    cleaned_input = " ".join(subject_input.lower().strip().split())
    vectorized_input = vectorizer.transform([cleaned_input])
    prediction = model.predict(vectorized_input)
    career_label = label_encoder.inverse_transform(prediction)[0]
    return [career_label]


# ✅ Function 2: Predict the **top-3** career matches with scores
def predict_top_3_careers(subjects: str):
    """
    Returns top 3 predicted careers with confidence scores
    Example: [('AI Engineer', 0.83), ('Data Analyst', 0.12), ('Graphic Designer', 0.05)]
    """
    if not subjects:
        return []

    processed_input = " ".join(subjects.lower().strip().split())
    vectorized_input = vectorizer.transform([processed_input])
    probabilities = model.predict_proba(vectorized_input)[0]

    # Get top 3 predictions
    top_3_indices = np.argsort(probabilities)[-3:][::-1]
    top_3_labels = label_encoder.inverse_transform(top_3_indices)
    top_3_scores = probabilities[top_3_indices]

    return list(zip(top_3_labels, top_3_scores))