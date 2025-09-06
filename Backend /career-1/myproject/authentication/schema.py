import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from .models import CustomUser

# ✅ User Type
class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ("id", "email", "first_name", "last_name")

# ✅ Register Mutation
class Register(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()

    def mutate(self, info, email, password, first_name="", last_name=""):
        user = CustomUser(email=email, first_name=first_name, last_name=last_name)
        user.username = email  # ✅ Set username field for AbstractUser
        user.set_password(password)
        user.save()
        return Register(user=user)

# ✅ Mutation Class
class Mutation(graphene.ObjectType):
    register = Register.Field()  # ✅ You missed this line earlier!
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

# ✅ Query Class
class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            return None
        return user

# ✅ Final schema
schema = graphene.Schema(query=Query, mutation=Mutation)