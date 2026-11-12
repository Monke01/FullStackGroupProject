import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Search, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { getLeaderboard, searchLeaderboard } from '../services/api';
import './Leaderboard.css';

function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaderboardData = async (query = '') => {
    try {
      setLoading(true);
      setError('');
      let data;
      if (query.trim()) {
        data = await searchLeaderboard(query.trim());
      } else {
        data = await getLeaderboard();
      }
      setEntries(data || []);
    } catch (err) {
      setError('Unable to load leaderboard. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchLeaderboardData(val);
  };

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return <span className="rank-pill rank-1">Rank 1</span>;
    }
    if (rank === 2) {
      return <span className="rank-pill rank-2">Rank 2</span>;
    }
    if (rank === 3) {
      return <span className="rank-pill rank-3">Rank 3</span>;
    }
    return <span className="rank-pill">#{rank}</span>;
  };

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="leaderboard-header">
        <button className="back-link" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Quiz Home
        </button>
        <div className="title-area">
          <h1>Student Leaderboard</h1>
          <p>Academic rankings based on total points and assessment scores</p>
        </div>
      </div>

      {/* Search and Refresh Bar */}
      <div className="leaderboard-controls">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search candidate by username..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => fetchLeaderboardData(searchQuery)}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="leaderboard-message error">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div className="leaderboard-message">
          <p>Loading candidate rankings...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && entries.length === 0 && (
        <div className="leaderboard-message empty">
          <Trophy size={36} className="empty-icon" />
          <h3>No Records Found</h3>
          <p>
            {searchQuery
              ? `No student record found for "${searchQuery}".`
              : 'No assessment attempts recorded yet.'}
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Start First Quiz
          </button>
        </div>
      )}

      {/* Table state */}
      {!loading && !error && entries.length > 0 && (
        <div className="leaderboard-table-card">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Username</th>
                <th style={{ width: '130px' }}>Quizzes Taken</th>
                <th style={{ width: '130px' }}>Highest Score</th>
                <th style={{ width: '130px' }}>Average</th>
                <th style={{ width: '140px', textAlign: 'right' }}>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.username}>
                  <td>{getRankBadge(entry.rank)}</td>
                  <td>
                    <span className="player-user">{entry.username}</span>
                    {entry.rank === 1 && <span className="top-badge">Top Performer</span>}
                  </td>
                  <td>{entry.totalAttempts}</td>
                  <td>
                    <span className="high-val">{entry.highestScore}/10</span>
                  </td>
                  <td>{entry.avgScore != null ? entry.avgScore.toFixed(1) : '0'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="points-val">{entry.totalPoints} pts</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
