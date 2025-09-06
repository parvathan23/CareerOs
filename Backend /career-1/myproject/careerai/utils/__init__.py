# utils/get_career_info.py
import pandas as pd
import os

# Get absolute dataset path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'data', 'final_career_dataset_700.csv')

try:
    df = pd.read_csv(DATASET_PATH)
    df.columns = df.columns.str.strip().str.lower()  # Normalize column names
except FileNotFoundError:
    raise FileNotFoundError(f"❌ Dataset not found at: {DATASET_PATH}")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load dataset: {e}")


def get_career_info(career_names):
    """
    Returns detailed career info for a list of predicted career names.
    """
    results = []

    for name in career_names:
        row = df[df["career"].str.lower().str.strip() == name.lower().strip()]
        if not row.empty:
            r = row.iloc[0]
            results.append({
                "careerDescription": r.get("career_description", "N/A"),
                "careerOpportunities": r.get("career_opportunities", "N/A"),
                "slMonthlySalary": r.get("sl_monthly_salary", "N/A"),
                "slLocation": r.get("sl_location", "N/A"),
                "foreignMonthlySalary": r.get("foreign_monthly_salary", "N/A"),
                "foreignLocation": r.get("foreign_location", "N/A"),
                "workType": r.get("work_type", "N/A"),
                "skills": r.get("skills", "N/A"),
                "educationRequirement": r.get("education_requirement", "N/A")
            })
        else:
            print(f"[ERROR] Career not found: {name}")
            results.append({
                "careerDescription": "N/A",
                "careerOpportunities": "N/A",
                "slMonthlySalary": "N/A",
                "slLocation": "N/A",
                "foreignMonthlySalary": "N/A",
                "foreignLocation": "N/A",
                "workType": "N/A",
                "skills": "N/A",
                "educationRequirement": "N/A"
            })

    return results