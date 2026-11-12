import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <BookOpen size={20} className="logo-icon" />
        <span className="logo-title">QuizForge</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
          Leaderboard
        </Link>
        <Link to="/admin" className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
          Admin Portal
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
