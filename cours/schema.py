import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from cours.models import Categoria, Curso


# Graphene automáticamente mapeara los campos del modelo Category en un nodo CategoryNode.
# Esto se configura en la Meta clase 
class CategoriaNode(DjangoObjectType):
    class Meta:
        model = Categoria
        filter_fields = ['nombre', 'cursos']
        interfaces = (relay.Node, )

# Se hace lo mismo con el modelo Ingredient
class CursoNode(DjangoObjectType):
    class Meta:
        model = Curso
        # Permite un filtrado mas avanzado
        filter_fields = {
            'nombre': ['exact', 'icontains', 'istartswith'],
            'descripcion': ['exact', 'icontains'],
            'categoria': ['exact'],
            'categoria__nombre': ['exact'],
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    categoria = relay.Node.Field(CategoriaNode)
    all_categorias = DjangoFilterConnectionField(CategoriaNode)

    curso = relay.Node.Field(CursoNode)
    all_cursos = DjangoFilterConnectionField(CursoNode)
