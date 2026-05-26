import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostReview.css';

const PostReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carModels, setCarModels] = useState([]);
    const [formData, setFormData] = useState({
        review: '',
        purchase_date: '',
        car_make: '',
        car_model: '',
        car_year: new Date().getFullYear(),
    });
    const [submitted, setSubmitted] = useState(false);
    const userName = sessionStorage.getItem('username');

    useEffect(() => {
        if (!userName) { navigate('/'); return; }
        fetch('/djangoapp/get_cars/')
            .then(res => res.json())
            .then(data => setCarModels(data.CarModels || []));
    }, [userName, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            name: userName,
            dealership: parseInt(id),
            purchase: true,
        };
        try {
            const res = await fetch('/djangoapp/add_review/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.status === 200) {
                setSubmitted(true);
                setTimeout(() => navigate(`/dealer/${id}`), 2000);
            }
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    if (submitted) return (
        <div className="post-review-container">
            <div className="success-card">
                <h2>✅ Review Submitted!</h2>
                <p>Thank you for your feedback. Redirecting...</p>
            </div>
        </div>
    );

    return (
        <div className="post-review-container">
            <div className="post-review-card">
                <h1>Post a Review</h1>
                <p className="subtitle">Share your experience at dealer #{id}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Review</label>
                        <textarea
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            placeholder="Write your review here..."
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Purchase Date</label>
                        <input
                            type="date"
                            name="purchase_date"
                            value={formData.purchase_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Car Make</label>
                            <select name="car_make" value={formData.car_make} onChange={handleChange} required>
                                <option value="">Select Make</option>
                                {[...new Set(carModels.map(c => c.CarMake))].map(make => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Car Model</label>
                            <select name="car_model" value={formData.car_model} onChange={handleChange} required>
                                <option value="">Select Model</option>
                                {carModels.filter(c => c.CarMake === formData.car_make).map(c => (
                                    <option key={c.CarModel} value={c.CarModel}>{c.CarModel}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Car Year</label>
                        <input
                            type="number"
                            name="car_year"
                            value={formData.car_year}
                            onChange={handleChange}
                            min="2015"
                            max="2024"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => navigate(`/dealer/${id}`)} className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Post Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostReview;
