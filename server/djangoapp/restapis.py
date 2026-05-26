import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('backend_url', 'http://localhost:3030')
sentiment_analyzer_url = os.getenv('sentiment_analyzer_url', 'http://localhost:5050')


def get_request(endpoint, **kwargs):
    params = '&'.join([f'{k}={v}' for k, v in kwargs.items()])
    request_url = f'{backend_url}{endpoint}?{params}' if params else f'{backend_url}{endpoint}'
    print(f'GET from {request_url}')
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f'Network exception occurred: {e}')
        return None


def analyze_review_sentiments(text):
    request_url = f'{sentiment_analyzer_url}/analyze/{text}'
    print(f'Sentiment analysis from {request_url}')
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f'Sentiment exception: {e}')
        return {'sentiment': 'unknown'}


def post_review(data_dict):
    request_url = f'{backend_url}/insert_review'
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.text)
        return response.json()
    except Exception as e:
        print(f'Network exception occurred: {e}')
        return None
