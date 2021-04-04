from django.db import models
from django.db.models import Sum
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from django.contrib.auth.models import User

class LikeDislikeManager(models.Manager):
    use_for_related_fields = True
 
    def likes(self):
        # We take the queryset with records greater than 0
        return self.get_queryset().filter(vote__gt=0)
 
    def dislikes(self):
        # We take the queryset with records less than 0
        return self.get_queryset().filter(vote__lt=0)
 
    def sum_rating(self):
        # We take the total rating
        return self.get_queryset().aggregate(Sum('vote')).get('vote__sum') or 0

    def questions(self):
        return self.get_queryset().filter(content_type__model='question').order_by('-questions__pub_date')

    def answers(self):
        return self.get_queryset().filter(content_type__model='answer').order_by('-answers__pub_date')
 
    def filter_by_instance(self, instance):
        content_type = ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        qs = super(LikeDislikeManager, self).filter(content_type=content_type, object_id=obj_id).filter(parent_comment=None)
        return qs



class LikeDislike(models.Model):
    LIKE = 1
    DISLIKE = -1

    VOTES = (
        (DISLIKE, 'Dislike'),
        (LIKE, 'Like')
    )

    vote = models.SmallIntegerField(verbose_name="vote", choices=VOTES)
    user = models.ForeignKey(User, verbose_name="user", on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    objects = LikeDislikeManager()

    def __str__(self):
        return "{} -> {} -> {} => {}".format(self.vote, self.content_object, self.object_id, self.user.first_name)