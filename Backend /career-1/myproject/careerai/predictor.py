# careerai/predictor.py
import os
import joblib
import pandas as pd
import numpy as np
from .graphql_types import CareerPrediction

# ---------- Paths ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_dir = os.path.join(BASE_DIR, "model")
data_path = os.path.join(BASE_DIR, "data/final_career_dataset_700.csv")

# ---------- Load once at startup ----------
model = joblib.load(os.path.join(model_dir, "career_model.pkl"))
vectorizer = joblib.load(os.path.join(model_dir, "vectorizer.pkl"))
label_encoder = joblib.load(os.path.join(model_dir, "label_encoder.pkl"))
df = pd.read_csv(data_path)

# ---------- Predict Top-1 ----------
def predict_career(subjects):
    if not subjects:
        return None, 0.0
    input_text = " ".join(subjects).lower().strip()
    vector = vectorizer.transform([input_text])
    prediction = model.predict(vector)
    score = model.predict_proba(vector).max()
    predicted_label = label_encoder.inverse_transform(prediction)[0]
    return predicted_label, float(score)

# ---------- Predict Top-N Careers ----------
def predict_top_careers(subjects, top_n=4):
    if not subjects:
        return []

    input_text = " ".join(subjects).lower().strip()
    vector = vectorizer.transform([input_text])
    probabilities = model.predict_proba(vector)[0]
    top_indices = np.argsort(probabilities)[-top_n:][::-1]

    results = []
    seen_labels = set()

    for idx in top_indices:
        label = label_encoder.inverse_transform([idx])[0]
        score = probabilities[idx]

        if label.lower() in seen_labels:
            continue
        seen_labels.add(label.lower())

        match = df[df['career_label'].str.lower() == label.lower()]
        if not match.empty:
            row = match.drop_duplicates(subset='career_label').iloc[0]
            skills_list = [s.strip() for s in str(row.get("skills", "")).split(",") if s.strip()]

            results.append(CareerPrediction(
                predictedCareer=label,
                score=round(score, 3),
                careerDescription=row.get("career_description", ""),
                careerOpportunities=row.get("career_opportunities", ""),
                educationRequirement=row.get("education_requirement", ""),
                slMonthlySalary=row.get("sl_monthly_salary", ""),
                slLocation=row.get("sl_location", ""),
                foreignMonthlySalary=row.get("foreign_monthly_salary", ""),
                foreignLocation=row.get("foreign_location", ""),
                workType=row.get("work_type", ""),
                skills=skills_list,
                relatedCourses=[]  # courses attach later
            ))
        else:
            results.append(CareerPrediction(
                predictedCareer=label,
                score=round(score, 3),
                relatedCourses=[]
            ))

    return results