from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

from qa.models import Question, Answer



class QuestionSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Question
        fields = "__all__"


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"
