import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Play, Trophy, BookOpen, Layers } from 'lucide-react';
import { createOrGetPlayer, getStatsOverview, getPlayerStats, getRecentAttempts } from '../services/api';
import './Home.css';

const UNITS = [
  'All Units',
  'Unit 1 - HTML and CSS',
  'Unit 2 - JavaScript and React',
  'Unit 3 - SQL and JDBC',
  'Unit 4 - Spring Boot Part 1',
  'Unit 5 - Spring Boot Part 2',
];

const DIFFICULTIES = ['Mixed', 'Easy', 'Medium', 'Hard'];

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Mixed');
  const [stats, setStats] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved player from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('quizforge_username');
    const savedPlayerId = localStorage.getItem('quizforge_playerId');
    if (savedUsername && savedPlayerId) {
      setUsername(savedUsername);
      setPlayerData({ id: parseInt(savedPlayerId), username: savedUsername });
    }
  }, []);

  // Fetch global stats on mount
  useEffect(() => {
    getStatsOverview()
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  // Fetch player stats when playerData changes
  useEffect(() => {
    if (playerData && playerData.id) {
      getPlayerStats(playerData.id)
        .then(data => setPlayerStats(data))
        .catch(() => {});
      getRecentAttempts(playerData.id)
        .then(data => setRecentAttempts(data))
        .catch(() => setRecentAttempts([]));
    }
  }, [playerData]);

  const handleStartQuiz = async () => {
    if (!username.trim()) {
      setError('Please enter your student username');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const player = await createOrGetPlayer(username.trim());
      localStorage.setItem('quizforge_username', player.username);
      localStorage.setItem('quizforge_playerId', player.id);
      setPlayerData(player);

      const unit = selectedUnit === 'All Units' ? '' : selectedUnit;
      const difficulty = selectedDifficulty === 'Mixed' ? '' : selectedDifficulty;

      navigate('/quiz', {
        state: {
          playerId: player.id,
          username: player.username,
          unit,
          difficulty,
        },
      });
    } catch (err) {
      setError('Failed to connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <h1 className="home-title">QuizForge Examination Platform</h1>
      </div>

      {/* Main Form Card */}
      <div className="home-card">
        <div className="card-header">
          <h2>Start New Assessment</h2>
          <p>Enter your registration username and configure quiz preferences.</p>
        </div>

        <div className="input-group">
          <label className="field-label">Student Username</label>
          <div className="input-wrapper">
            <User size={16} className="input-icon" />
            <input
              type="text"
              placeholder="e.g. RA2211003010001"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="select-row">
          <div className="select-group">
            <label className="field-label">
              <BookOpen size={14} /> Course Unit
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="select-field"
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label className="field-label">
              <Layers size={14} /> Difficulty Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select-field"
            >
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-row">
          <button
            className="btn btn-primary"
            onClick={handleStartQuiz}
            disabled={!username.trim() || loading}
          >
            <Play size={16} />
            {loading ? 'Initializing...' : 'Begin Quiz (10 Questions)'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy size={16} />
            View Leaderboard
          </button>
        </div>
      </div>

      {/* Course Overview Stats */}
      {stats && (
        <div className="stats-section">
          <h3 className="section-title">Course Question Bank Overview</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.totalQuestions || 0}</span>
              <span className="stat-label">Syllabus Questions</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.totalAttempts || 0}</span>
              <span className="stat-label">Total Student Attempts</span>
            </div>
          </div>
        </div>
      )}

      {/* Player Stats */}
      {playerData && playerStats && (
        <div className="stats-section">
          <h3 className="section-title">Academic Record: {playerData.username}</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{playerStats.totalAttempts || 0}</span>
              <span className="stat-label">Quizzes Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{playerStats.highestScore || 0}/10</span>
              <span className="stat-label">Highest Score</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Attempts */}
      {playerData && recentAttempts.length > 0 && (
        <div className="stats-section">
          <h3 className="section-title">Recent Quiz History</h3>
          <div className="attempts-table-wrapper">
            <table className="attempts-table">
              <thead>
                <tr>
                  <th>Attempt ID</th>
                  <th>Score</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map((attempt) => (
                  <tr key={attempt.id}>
                    <td>#{attempt.id}</td>
                    <td>
                      <span className="score-pill">{attempt.score}/{attempt.totalQuestions}</span>
                    </td>
                    <td>{new Date(attempt.attemptedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
