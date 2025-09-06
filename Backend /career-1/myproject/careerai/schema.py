
# careerai/schema.py
import os
import pandas as pd
import graphene
from graphene import ObjectType, String, Float, List, Boolean, Field
from .predictor import predict_top_careers
from graphql import GraphQLError

# ---------- Load Dataset ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "data", "final_career_dataset_700.csv")
df = pd.read_csv(CSV_PATH)

# ---------- GraphQL Types ----------
# class CourseType(ObjectType):
#     title = String()
#     platform = String()
#     url = String()
#     rating = Float()
#     review_count = Float()
#     is_free = Boolean()
#     price = String()
#     level = String()
#     duration = String()
#     language = String()
#     certificate = Boolean()
#     enrollment_count = Float()
#     instructor = String()
#     created_at = String()

class CareerDetailType(ObjectType):
    predictedCareer = String()
    careerDescription = String()
    educationRequirement = String()
    skills = List(String)
    careerOpportunities = String()
    slMonthlySalary = String()
    slLocation = String()
    foreignMonthlySalary = String()
    foreignLocation = String()
    workType = String()
    score = Float()
    relatedCourses = List(CourseType)

# ---------- Query ----------
class Query(ObjectType):
    getAllSubjects = List(String)
    predictCareer = List(CareerDetailType, subjects=List(String, required=True))
    getCareerDetails = List(CareerDetailType, names=List(String, required=True))
    getCareerDetailByName = Field(CareerDetailType, careerName=String(required=True))

    # 🔹 All subjects list
    def resolve_getAllSubjects(self, info):
        subjects_col = df['subjects'].dropna().tolist()
        all_subjects = set()
        for line in subjects_col:
            for s in line.split(","):
                all_subjects.add(s.strip())
        return sorted(list(all_subjects))

    # 🔹 Predict by subjects (ML + CSV)
    def resolve_predictCareer(self, info, subjects):
        if not subjects or all(not s.strip() for s in subjects):
            raise GraphQLError("Please provide at least one valid subject.")
        return predict_top_careers(subjects, top_n=4)


    # 🔹 Get details by multiple subject names
    def resolve_getCareerDetails(self, info, names):
        if not names or len(names) == 0:
            raise GraphQLError("Please provide at least one subject name.")
        return predict_top_careers(names, top_n=4)

    # 🔹 Get detail by one career name
    def resolve_getCareerDetailByName(self, info, careerName):
        match = df[df['career_label'].str.lower() == careerName.lower()]
        if match.empty:
            raise Exception("Career not found")

        row = match.iloc[0]
        skills_list = [s.strip() for s in str(row.get("skills", "")).split(",") if s.strip()]

        return CareerDetailType(
            predictedCareer=row.get("career_label", ""),
            careerDescription=row.get("career_description", ""),
            educationRequirement=row.get("education_requirement", ""),
            skills=skills_list,
            careerOpportunities=row.get("career_opportunities", ""),
            slMonthlySalary=row.get("sl_monthly_salary", ""),
            slLocation=row.get("sl_location", ""),
            foreignMonthlySalary=row.get("foreign_monthly_salary", ""),
            foreignLocation=row.get("foreign_location", ""),
            workType=row.get("work_type", ""),
            score=None,
            relatedCourses=[]   # Removed external API → keep empty
        )

# ---------- Schema ----------
class Mutation(ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)