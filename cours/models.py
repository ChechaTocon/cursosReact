from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.ForeignKey(
        Categoria, related_name="cursos", on_delete=models.CASCADE, blank=True
    )

    def __str__(self):
        return self.nombre

# Agregar la aplicacion a la configuracion en cookbook/settings.py