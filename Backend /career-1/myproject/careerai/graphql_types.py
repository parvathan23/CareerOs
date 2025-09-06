# careerai/graphql_types.py
import graphene

class AiCourseType(graphene.ObjectType):
    title = graphene.String()
    description = graphene.String()
    imageUrl = graphene.String()
    platform = graphene.String()
    rating = graphene.Float()
    reviewCount = graphene.Int()
    url = graphene.String()
    isFree = graphene.Boolean()
    level = graphene.String()
    instructor = graphene.String()
    duration = graphene.String()
    certificate = graphene.String()
    isFreeLabel = graphene.String()

    def resolve_isFreeLabel(self, info):
        return "Free" if self.isFree else "Paid"

class CareerPrediction(graphene.ObjectType):
    predictedCareer = graphene.String()
    score = graphene.Float()
    careerDescription = graphene.String()
    careerOpportunities = graphene.String()
    educationRequirement = graphene.String()
    slMonthlySalary = graphene.String()
    slLocation = graphene.String()
    foreignMonthlySalary = graphene.String()
    foreignLocation = graphene.String()
    workType = graphene.String()
    skills = graphene.String()
    relatedCourses = graphene.List(lambda: AiCourseType)