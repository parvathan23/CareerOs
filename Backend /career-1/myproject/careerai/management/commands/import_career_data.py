import os
import csv
from django.core.management.base import BaseCommand
from careerai.models import CareerRecommendation

class Command(BaseCommand):
    help = "Import careers dataset into database"

    def handle(self, *args, **kwargs):
        csv_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "data",
            "final_career_dataset_700.csv"
        )

        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"❌ CSV file not found at: {csv_path}"))
            return

        with open(csv_path, newline='', encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                CareerRecommendation.objects.create(
                    subjects=row.get('subjects', 'Not specified'),
                    career=row.get('career_label', 'Not specified'),
                    career_description=row.get('career_description', 'Not specified'),
                    career_opportunities=row.get('career_opportunities', 'Not specified'),
                    sl_monthly_salary=row.get('sl_monthly_salary', 'N/A'),
                    sl_location=row.get('sl_location', 'N/A'),
                    foreign_monthly_salary=row.get('foreign_monthly_salary', 'N/A'),
                    foreign_location=row.get('foreign_location', 'N/A'),
                    work_type=row.get('work_type', 'N/A'),
                    skills=row.get('skills', 'Not specified'),
                    education_requirement=row.get('education_requirement', 'Not specified')
                )

        self.stdout.write(self.style.SUCCESS("✅ Career data imported successfully!"))