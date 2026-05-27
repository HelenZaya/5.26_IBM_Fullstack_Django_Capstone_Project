# xrwvm-fullstack_developer_capstone

**Project Name:** Cars Dealership Portal  
**Developer:** Buyanzaya Shijir  
**Course:** IBM Full Stack Application Development Capstone

## Project Overview

A full-stack web application built for **Cars Dealership**, a national car retailer in the U.S. The application allows users to browse dealership locations, view dealer details, read reviews, and submit their own reviews.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Django (Python) |
| Database API | Node.js + Express + MongoDB |
| Sentiment Analysis | Flask (Python) |
| Containerization | Docker |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| Cloud Deployment | IBM Cloud Code Engine |

## Project Structure

```
server/
├── djangoproj/        # Django project configuration
├── djangoapp/         # Django application (models, views, APIs)
│   └── microservices/ # Proxy service layer
├── frontend/
│   ├── static/        # Static HTML pages (About, Contact)
│   └── src/           # React components
│       └── components/
│           ├── Register/
│           ├── Dealers/
│           ├── Dealer/
│           └── PostReview/
└── database/          # Node.js dealer data service
```

## Features

- User registration, login, and logout
- Browse all dealerships or filter by state
- View dealer details and customer reviews
- Submit reviews with sentiment analysis
- Django Admin panel for managing car makes and models
- CI/CD pipeline with GitHub Actions
- Deployed to Kubernetes on IBM Cloud

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker

### Run Django Server
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Run Database Service
```bash
cd server/database
npm install
node app.js
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/get_dealers/` | GET | Get all dealerships |
| `/api/get_dealers/state/<state>/` | GET | Get dealers by state |
| `/api/get_dealers/<id>/` | GET | Get dealer by ID |
| `/api/get_dealers/<id>/reviews/` | GET | Get reviews for a dealer |
| `/api/add_review/` | POST | Add a new review |
| `/djangoapp/get_cars/` | GET | Get all car makes and models |
| `/djangoapp/analyze_review/<review>/` | GET | Analyze review sentiment |
