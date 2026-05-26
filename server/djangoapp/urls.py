from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('register', views.registration, name='register'),
    path('get_dealers/', views.get_dealerships, name='get_dealers'),
    path('get_dealers/state/<str:state>/', views.get_dealerships, name='get_dealers_by_state'),
    path('get_dealers/<int:dealer_id>/', views.get_dealer_details, name='get_dealer_details'),
    path('get_dealers/<int:dealer_id>/reviews/', views.get_dealer_reviews, name='get_dealer_reviews'),
    path('add_review/', views.add_review, name='add_review'),
    path('get_cars/', views.get_cars, name='get_cars'),
    path('analyze_review/<str:text>/', views.analyze_review, name='analyze_review'),
]
