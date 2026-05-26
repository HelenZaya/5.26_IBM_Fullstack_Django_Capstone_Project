import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dealers.css';

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    const [filteredDealers, setFilteredDealers] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('All');
    const [loading, setLoading] = useState(true);
    const userName = sessionStorage.getItem('username');

    const fetchDealers = async (state = 'All') => {
        setLoading(true);
        try {
            const url = state === 'All'
                ? '/djangoapp/get_dealers/'
                : `/djangoapp/get_dealers/state/${state}/`;
            const res = await fetch(url);
            const data = await res.json();
            const dealerList = data.dealers || [];
            setDealers(dealerList);
            setFilteredDealers(dealerList);
            const uniqueStates = ['All', ...new Set(dealerList.map(d => d.state))];
            setStates(uniqueStates);
        } catch (err) {
            console.error('Error fetching dealers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDealers(); }, []);

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        fetchDealers(state);
    };

    return (
        <div className="dealers-container">
            <div className="dealers-hero">
                <h1>Find Your Dealer</h1>
                <p>Browse our nationwide network of trusted car dealerships</p>
            </div>

            <div className="dealers-controls">
                <select value={selectedState} onChange={handleStateChange} className="state-filter">
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {loading ? (
                <div className="loading">Loading dealers...</div>
            ) : (
                <div className="dealers-grid">
                    {filteredDealers.map(dealer => (
                        <div key={dealer.id} className="dealer-card">
                            <div className="dealer-card-header">
                                <h3>{dealer.full_name}</h3>
                                <span className="dealer-rating">⭐ {dealer.rating}/5</span>
                            </div>
                            <p className="dealer-location">📍 {dealer.city}, {dealer.state}, {dealer.zip}</p>
                            <p className="dealer-address">{dealer.address}</p>
                            <div className="dealer-card-footer">
                                <Link to={`/dealer/${dealer.id}`} className="view-btn">View Details & Reviews</Link>
                                {userName && (
                                    <Link to={`/postreview/${dealer.id}`} className="review-btn">Post Review</Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dealers;
