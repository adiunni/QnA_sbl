from django.db import models
from django.conf import settings

from taggit.managers import TaggableManager

class Question(models.Model):
    title = models.CharField(max_length=256)
    desc = models.CharField(max_length=1024)
    tags = TaggableManager()
    pub_at = models.DateTimeField('date published', auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field="username")

    def __str__(self):
        return self.title
    
    

class Answer(models.Model):
    text = models.CharField(max_length=2048)
    pub_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field="username")
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
