from django.db.models import Q, Sum
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import QuestionSerializer, AnswerSerializer
from .paginations import QuestionPagination

from qa.models import Question, Answer

class QuestionSearch(APIView):

    def get(self, request, format=None):
        questions = Question.objects.all().order_by("-pub_at")
        q = request.GET.get("q")
        qs = []
        if q:
            questions = questions.filter(
                Q(title__icontains=q) |
                Q(desc__icontains=q) |
                Q(user__first_name__icontains=q)|
                Q(user__last_name__icontains=q)
            ).distinct()

        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class QuestionList(APIView, QuestionPagination):
    # pagination_class = QuestionPagination

    def get(self, request, format=None):
        questions = Question.objects.all()
        qs = []
        by = request.GET.get("sort")
        if by:
            if by == "votes":
                questions = questions.annotate(qlikes=Sum("votes__vote")).order_by("-qlikes")
            elif by == "newest":
                questions = questions.order_by("-pub_at")
            elif by == "oldest":
                question = questions.order_by("pub_at")
            
        q = request.GET.get("q")
        if q:
            questions = questions.filter(
                Q(title__icontains=q) |
                Q(desc__icontains=q) |
                Q(user__first_name__icontains=q)|
                Q(user__last_name__icontains=q)|
                Q(tags__name__icontains=q)
            ).distinct()
            
        for q in questions:
            likes = q.votes.likes().count()
            dislikes = q.votes.dislikes().count()
            sum_rating = q.votes.sum_rating()
            qs.append({
                "question": QuestionSerializer(q).data,
                "likes": likes,
                "dislikes": dislikes,
                "sum_rating": sum_rating
            })
        
        qs = self.paginate_queryset(qs, request, view=self)


        # serializer = QuestionSerializer(questions, many=True)
        return self.get_paginated_response(qs)

    def post(self, request, format=None):
        print(request.user)
        if request.user is None:
            print("no user")
            return Response({"detail": "Not Logged In"}, status=status.HTTP_400_BAD_REQUEST) 
        serializer = QuestionSerializer(data=request.data)
        request.data['user'] = request.user
        if serializer.is_valid():
            # serializer.save(user=self.request.user)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class QuestionDetail(APIView):

    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Response({"detail": "Question Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        likes = question.votes.likes().count()
        dislikes = question.votes.dislikes().count()
        sum_rating = question.votes.sum_rating()
        serializer = QuestionSerializer(question)
        answers = question.answer_set.all()
        answers_qs = []
        for a in answers:
            a_likes = a.votes.likes().count()
            a_dislikes = a.votes.dislikes().count()
            a_sum_rating = a.votes.sum_rating()
            answers_qs.append({
                "answer": AnswerSerializer(a).data,
                "likes": a_likes,
                "dislikes": a_dislikes,
                "sum_rating": a_sum_rating
            })
        # answers_serializer = AnswerSerializer(answers, many=True)
        data = {
            "question": serializer.data,
            "answers": answers_qs,
            "likes" : likes,
            "dislikes" : dislikes,
            "sum_rating": sum_rating 
        }
        return Response(data)

    def put(self, request, pk, format=None):
        if request.user is None:
            print("no user")
            return Response({"detail": "Not Logged In"}, status=status.HTTP_400_BAD_REQUEST) 
        question = self.get_object(pk)

        if request.user != question.user:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = QuestionSerializer(question, data=request.data)
        request.data['user'] = request.user
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        if request.user != question.user:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_400_BAD_REQUEST)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AnswerList(APIView):

    def get(self, request, format=None):
        answers = Answer.objects.all()
        qs = []
        for a in answers:
            likes = a.votes.likes().count()
            dislikes = a.votes.dislikes().count()
            sum_rating = a.votes.sum_rating()
            qs.append({
                "answer": AnswerSerializer(a).data,
                "likes": likes,
                "dislikes": dislikes,
                "sum_rating": sum_rating
            })
        # serializer = AnswerSerializer(answers, many=True)
        return Response(qs)

    def post(self, request, format=None):
        if request.user is None:
            return Response({"detail": "Not Logged In"}, status=status.HTTP_400_BAD_REQUEST) 
        serializer = AnswerSerializer(data=request.data)
        request.data['user'] = request.user
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerDetail(APIView):

    def get_object(self, pk):
        try:
            return Answer.objects.get(pk=pk)
        except Answer.DoesNotExist:
            raise Response({"detail": "Answer Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        answer = self.get_object(pk)
        print(answer)
        likes = answer.votes.likes().count()
        dislikes = answer.votes.dislikes().count()
        sum_rating = answer.votes.sum_rating()
        serializer = AnswerSerializer(answer)
        data = {
            "answer" : serializer.data,
            "likes" : likes,
            "dislikes" : dislikes,
            "sum_rating": sum_rating 
        }
        return Response(data)

    def put(self, request, pk, format=None):
        if request.user is None:
            return Response({"status": "error"}, status=status.HTTP_400_BAD_REQUEST)
        
        answer = self.get_object(pk)
        print(answer.user)
        if request.user != answer.user:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AnswerSerializer(answer, data=request.data)
        request.data['user'] = request.user
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        answer = self.get_object(pk)
        print(answer)
        if request.user != answer.user:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_400_BAD_REQUEST)
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)