import graphene

import cours.schema


class Query(cours.schema.Query, graphene.ObjectType):
    # Esta clase heredara de multiples consultas
    # segun vayamos agregando aplicaciones a nuestro proyecto
    pass

class Mutation(cours.schema.Mutation, graphene.ObjectType):

    pass

schema = graphene.Schema(query=Query, mutation=Mutation)