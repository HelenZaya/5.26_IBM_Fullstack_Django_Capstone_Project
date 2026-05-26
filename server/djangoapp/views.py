from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .restapis import get_request, analyze_review_sentiments, post_review
from .models import CarMake, CarModel
import json
import logging

logger = logging.getLogger(__name__)


def get_dealerships(request, state='All'):
    if state == 'All':
        endpoint = '/fetchDealers'
    else:
        endpoint = f'/fetchDealers/{state}'
    dealerships = get_request(endpoint)
    return JsonResponse({'status': 200, 'dealers': dealerships})


def get_dealer_details(request, dealer_id):
    if dealer_id:
        endpoint = f'/fetchDealer/{dealer_id}'
        dealership = get_request(endpoint)
        return JsonResponse({'status': 200, 'dealer': dealership})
    return JsonResponse({'status': 400, 'message': 'Bad Request'})


def get_dealer_reviews(request, dealer_id):
    if dealer_id:
        endpoint = f'/fetchReviews/dealer/{dealer_id}'
        reviews = get_request(endpoint)
        for review in reviews:
            sentiment = analyze_review_sentiments(review.get('review', ''))
            review['sentiment'] = sentiment.get('sentiment', 'neutral')
        return JsonResponse({'status': 200, 'reviews': reviews})
    return JsonResponse({'status': 400, 'message': 'Bad Request'})


@csrf_exempt
def add_review(request):
    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            response = post_review(data)
            return JsonResponse({'status': 200})
        except Exception as e:
            return JsonResponse({'status': 401, 'message': f'Error: {e}'})
    return JsonResponse({'status': 403, 'message': 'Unauthorized'})


def dealer_page(request, dealer_id):
    return render(request, 'dealer_details.html', {'dealer_id': dealer_id})


def add_review_page(request, dealer_id):
    if request.user.is_anonymous:
        return redirect(f'/?dealer_id={dealer_id}&action=review')
    cars = CarModel.objects.select_related('car_make')
    return render(request, 'add_review.html', {'dealer_id': dealer_id, 'cars': cars})


def get_cars(request):
    car_models = CarModel.objects.select_related('car_make')
    cars = [
        {
            'CarModel': cm.name,
            'CarMake': cm.car_make.name,
            'CarType': cm.car_type,
            'Year': cm.year,
        }
        for cm in car_models
    ]
    return JsonResponse({'CarModels': cars})


def analyze_review(request, text):
    sentiment = analyze_review_sentiments(text)
    return JsonResponse({'sentiment': sentiment})


@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data.get('userName')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'userName': username, 'status': 'Authenticated'})
    return JsonResponse({'userName': username, 'status': 'Failed'})


@csrf_exempt
def logout_request(request):
    logout(request)
    return JsonResponse({'userName': ''})


@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data.get('userName')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')

    try:
        user = User.objects.get(username=username)
        return JsonResponse({'userName': username, 'error': 'Already Registered'})
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
        )
        login(request, user)
        return JsonResponse({'userName': username, 'status': 'Authenticated'})
