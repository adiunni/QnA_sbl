from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
 
from likesdislikes.models import LikeDislike
 
 
class VotesView(APIView):
    model = None    # Data Model - Question or Answer
    vote_type = None # Vote type Like/Dislike
 
    def post(self, request, pk):
        obj = self.model.objects.get(pk=pk)
        
        try:
            likedislike = LikeDislike.objects.get(content_type=ContentType.objects.get_for_model(obj), object_id=obj.id, user=request.user)
            if likedislike.vote is not self.vote_type:
                likedislike.vote = self.vote_type
                likedislike.save(update_fields=['vote'])
                result = True
            else:
                likedislike.delete()
                result = False
        except LikeDislike.DoesNotExist:
            obj.votes.create(user=request.user, vote=self.vote_type)
            result = True
 
        return Response({
            "result": result,
            "like_count": obj.votes.likes().count(),
            "dislike_count": obj.votes.dislikes().count(),
            "sum_rating": obj.votes.sum_rating()
        })