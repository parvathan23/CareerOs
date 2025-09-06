import csv
import os
from careerai.models import CareerRecommendation

def run():
    # Absolute path to the CSV inside 'data' folder
    csv_path = os.path.join(os.path.dirname(__file__), 'data', 'career_dataset_correct.csv')

    # Open and read the CSV file
    with open(csv_path, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            CareerRecommendation.objects.create(
                subjects=row.get('subjects', '').strip() or 'Not specified',
                career=row.get('career', '').strip() or 'Not specified',
                career_description=row.get('career_description', '').strip() or 'Not specified',
                career_opportunities=row.get('career_opportunities', '').strip() or 'Not specified',
                sl_monthly_salary=row.get('sl_monthly_salary', '').strip() or 'Not specified',
                sl_location=row.get('sl_location', '').strip() or 'Not specified',
                foreign_monthly_salary=row.get('foreign_monthly_salary', '').strip() or 'Not specified',
                foreign_location=row.get('foreign_location', '').strip() or 'Not specified',
                work_type=row.get('work_type', '').strip() or 'Not specified',
                skills_required=row.get('skills_required', '').strip() or 'Not specified',
                education_required=row.get('education_required', '').strip() or 'Not specified',
            )

    print("✅ CareerRecommendation data loaded successfully!")