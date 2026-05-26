import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dealer.css';

const Dealer = () => {
    const { id } = useParams();
    const [dealer, setDealer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const userName = sessionStorage.getItem('username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dealerRes, reviewsRes] = await Promise.all([
                    fetch(`/djangoapp/get_dealers/${id}/`),
                    fetch(`/djangoapp/get_dealers/${id}/reviews/`),
                ]);
                const dealerData = await dealerRes.json();
                const reviewsData = await reviewsRes.json();
                setDealer(dealerData.dealer);
                setReviews(reviewsData.reviews || []);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const getSentimentEmoji = (sentiment) => {
        if (sentiment === 'positive') return '😊';
        if (sentiment === 'negative') return '😞';
        return '😐';
    };

    if (loading) return <div className="loading">Loading dealer details...</div>;

    return (
        <div className="dealer-detail-container">
            {dealer && (
                <div className="dealer-info-card">
                    <div className="dealer-info-header">
                        <div>
                            <h1>{dealer.full_name}</h1>
                            <p>📍 {dealer.city}, {dealer.state} {dealer.zip}</p>
                            <p>{dealer.address}</p>
                        </div>
                        <div className="dealer-rating-badge">⭐ {dealer.rating}/5</div>
                    </div>
                    {userName && (
                        <Link to={`/postreview/${id}`} className="post-review-link">
                            + Post a Review
                        </Link>
                    )}
                </div>
            )}

            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review, idx) => (
                        <div key={idx} className="review-card">
                            <div className="review-header">
                                <span className="reviewer-name">{review.name}</span>
                                <span className="sentiment">{getSentimentEmoji(review.sentiment)} {review.sentiment}</span>
                            </div>
                            <p className="review-text">{review.review}</p>
                            <div className="review-meta">
                                <span>{review.car_make} {review.car_model} ({review.car_year})</span>
                                <span>Purchased: {review.purchase_date}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dealer;
