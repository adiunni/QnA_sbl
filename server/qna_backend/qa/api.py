from qa.models import Question, Answer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import QuestionSerializer, AnswerSerializer


class QuestionList(APIView):

    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

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
        serializer = QuestionSerializer(question)
        answers = question.answer_set.all()
        answers_serializer = AnswerSerializer(answers, many=True)
        data = {
            "question": serializer.data,
            "answers": answers_serializer.data
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
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)

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
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

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
        if request.user != answer.user:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_400_BAD_REQUEST)
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)