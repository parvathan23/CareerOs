from django.db import models

class CareerRecommendation(models.Model):
    subjects = models.CharField(max_length=255)
    career = models.CharField(max_length=255)
    career_description = models.TextField()
    career_opportunities = models.TextField()
    sl_monthly_salary = models.CharField(max_length=100)
    sl_location = models.CharField(max_length=255)
    foreign_monthly_salary = models.CharField(max_length=100)
    foreign_location = models.CharField(max_length=255)
    work_type = models.CharField(max_length=100)
    skills = models.TextField()
    education_requirement = models.TextField()

    def __str__(self):
        return f"{self.career} ({self.subjects})"