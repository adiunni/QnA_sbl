from django.db import models
from django.db.models.functions import Coalesce
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

from taggit.managers import TaggableManager

from likesdislikes.models import LikeDislike


# class QuestionManager(models.Manager):
#     def get_queryset(self):
#         return super(QuestionManager, self).get_queryset().filter()
    



class Question(models.Model):
    title = models.CharField(max_length=256)
    desc = models.CharField(max_length=1024)
    tags = TaggableManager()
    pub_at = models.DateTimeField('date published', auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field="username")
    votes = GenericRelation(LikeDislike, related_query_name='questions')


    # objects = QuestionManager()

    @property
    def get_content_type(self):
        return ContentType.objects.get_for_model(self.__class__)

    def __str__(self):
        return self.title
    
    

class Answer(models.Model):
    text = models.CharField(max_length=2048)
    pub_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field="username")
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    votes = GenericRelation(LikeDislike, related_query_name='answers')

    @property
    def get_content_type(self):
        return ContentType.objects.get_for_model(self.__class__)
