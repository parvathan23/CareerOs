import graphene

# Import Query and Mutation from each app
from careerai.schema import Query as CareerQuery, Mutation as CareerMutation
from authentication.schema import Query as AuthQuery, Mutation as AuthMutation


# Unified Query class (combining all app-level queries)
class Query(
    CareerQuery,
    AuthQuery,
    graphene.ObjectType
):
    pass

# Unified Mutation class (no ai_course Mutation yet)
class Mutation(
    CareerMutation,
    AuthMutation,
    graphene.ObjectType
):
    pass

# Final GraphQL Schema
schema = graphene.Schema(query=Query, mutation=Mutation)