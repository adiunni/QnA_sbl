
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from cauth.views import Logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('qa.urls')),
    path('api/logout', Logout.as_view(), name='logout'),
    path('api/login', views.obtain_auth_token, name='api-auth-token'),
    path('', include('likesdislikes.urls', namespace='likesdislikes')),
    path('', include('cauth.urls')),
]
