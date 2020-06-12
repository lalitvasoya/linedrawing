from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

class PalmLine(models.Model):
    """ Storing Line coordinates """
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    lines = JSONField(null=True)
    
    def __str__(self):
        return str(self.id) + " "+self.user.username
