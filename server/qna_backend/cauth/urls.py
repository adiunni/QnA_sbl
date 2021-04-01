# from rest_framework import routers
# from .api import RegisterViewSet

# router = routers.DefaultRouter()

# router.register('api/u', RegisterViewSet, 'signup')

# urlpatterns = router.urls
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import UserList, UserDetail, UserQuestion, UserAnswer
from .views import UserByName

urlpatterns = [
    path('api/u', UserList.as_view()),
    path('api/u/<slug:username>', UserByName.as_view()),
    path('api/u/<int:pk>', UserDetail.as_view()),
    path('api/u/<int:pk>/questions', UserQuestion.as_view()),
    path('api/u/<int:pk>/answers', UserAnswer.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)