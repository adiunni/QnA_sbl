from django.urls import path
from django.contrib.auth.decorators import login_required
 
from .api import VotesView
from .models import LikeDislike
from qa.models import Question, Answer
 
app_name = 'likesdislikes'
urlpatterns = [
    path('api/q/<int:pk>/like',
        VotesView.as_view(model=Question, vote_type=LikeDislike.LIKE),
        name='question_like'),
    path('api/q/<int:pk>/dislike',
        VotesView.as_view(model=Question, vote_type=LikeDislike.DISLIKE),
        name='question_dislike'),
    
    path('api/a/<int:pk>/like',
        VotesView.as_view(model=Answer, vote_type=LikeDislike.LIKE),
        name='answer_like'),
    path('api/a/<int:pk>/dislike',
        VotesView.as_view(model=Answer, vote_type=LikeDislike.DISLIKE),
        name='answer_dislike'),
]