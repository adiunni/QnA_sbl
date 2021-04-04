from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout
from django.contrib.auth.models import User

from .serializers import RegisterSerializer
from qa.serializers import QuestionSerializer


class Logout(APIView):

    def post(self, request, format=None):
        request.user.auth_token.delete()
        logout(request)
        print(request.user)
        return Response(status=status.HTTP_200_OK)


class UserByName(APIView):

    def get(self, request, username, format=None):
        user = User.objects.filter(username=username).first()
        if user is None:
            return Response({"detail": "User Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RegisterSerializer(user)
        questions = user.question_set.all()
        qs = []
        for q in questions:
            likes = q.votes.likes().count()
            dislikes = q.votes.dislikes().count()
            sum_rating = q.votes.sum_rating()
            d = {
                "likes": likes,
                "dislikes": dislikes,
                "sum_rating": sum_rating,
                "question": QuestionSerializer(q).data
            }
            qs.append(d)
        # questions_serializer = QuestionSerializer(questions, many=True)
        data = {
            "user": serializer.data,
            "questions": qs
        }
        
        return Response(data)