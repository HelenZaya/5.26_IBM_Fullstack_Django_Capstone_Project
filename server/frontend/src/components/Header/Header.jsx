import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from '../Register/Register';
import './Header.css';

const Header = () => {
    const [showRegister, setShowRegister] = useState(false);
    const userName = sessionStorage.getItem('username');

    const handleLogin = async () => {
        const username = prompt('Username:');
        const password = prompt('Password:');
        if (!username || !password) return;
        const res = await fetch('/djangoapp/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: username, password }),
        });
        const data = await res.json();
        if (data.status === 'Authenticated') {
            sessionStorage.setItem('username', username);
            window.location.reload();
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = async () => {
        await fetch('/djangoapp/logout');
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-brand">🚗 Cars Dealership</Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <a href="/static/About.html" className="nav-link">About</a>
                    <a href="/static/Contact.html" className="nav-link">Contact</a>
                    {userName ? (
                        <>
                            <span className="nav-username">👤 {userName}</span>
                            <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogin} className="nav-btn login-btn">Login</button>
                            <button onClick={() => setShowRegister(true)} className="nav-btn register-btn">Register</button>
                        </>
                    )}
                </div>
            </nav>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
        </>
    );
};

export default Header;
