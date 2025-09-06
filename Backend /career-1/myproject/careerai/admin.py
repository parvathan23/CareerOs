from django.contrib import admin
from .models import CareerRecommendation

@admin.register(CareerRecommendation)
class CareerRecommendationAdmin(admin.ModelAdmin):
    list_display = (
        "subjects",
        "career",
        "career_description",
        "career_opportunities",
        "sl_monthly_salary",
        "sl_location",
        "foreign_monthly_salary",
        "foreign_location",
        "work_type",
        "skills",  # ✅ correct
        "education_requirement",  # ✅ correct
    )
    search_fields = ("subjects", "career", "skills")
    list_filter = ("sl_location", "foreign_location", "work_type")