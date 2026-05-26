import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Dealers from './components/Dealers/Dealers';
import Dealer from './components/Dealer/Dealer';
import PostReview from './components/PostReview/PostReview';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Dealers />} />
                <Route path="/dealer/:id" element={<Dealer />} />
                <Route path="/postreview/:id" element={<PostReview />} />
            </Routes>
        </Router>
    );
}

export default App;
