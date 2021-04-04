from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer

from qa.serializers import QuestionSerializer, AnswerSerializer

class UserList(APIView):
    # queryset = User.objects.all()
    # permission_classes = [
    #     permissions.AllowAny
    # ]
    # serializer_class = RegisterSerializer
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = RegisterSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save(user=self.request.user)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RegisterView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = RegisterSerializer

class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
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

class UserQuestion(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Response({"detail": "User Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_object_by_username(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "User Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
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

class UserAnswer(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Response({"detail": "User Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = RegisterSerializer(user)
        answers = user.answer_set.all()
        answers_serializer = AnswerSerializer(answers, many=True)
        data = {
            "user": serializer.data,
            "answers": answers_serializer.data
        }
        
        return Response(data)
