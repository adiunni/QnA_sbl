from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import QuestionList, QuestionDetail, AnswerList, AnswerDetail, QuestionSearch

urlpatterns = [
    path('api/q', QuestionList.as_view()),
    path('api/q/<int:pk>', QuestionDetail.as_view()),
    path('api/q/search', QuestionSearch.as_view()),
    path('api/a', AnswerList.as_view()),
    path('api/a/<int:pk>', AnswerDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)