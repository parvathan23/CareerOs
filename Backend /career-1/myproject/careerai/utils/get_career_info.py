import pandas as pd

# ✅ Make sure this path points to the correct file with 'career' column
df = pd.read_csv("careerai/data/final_career_dataset_700.csv")

# Debug: Print columns
print("✅ Loaded Columns:", df.columns.tolist())

def get_career_info(career_names):
    results = []

    if "career" not in df.columns:
        raise KeyError("❌ Column 'career' not found in the dataset. Please check your CSV file.")

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