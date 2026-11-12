import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Plus, Trash2, Search, ArrowLeft, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { adminLogin, adminGetAllQuestions, adminAddQuestion, adminDeleteQuestion } from '../services/api';
import './Admin.css';

const UNITS = [
  'Unit 1 - HTML and CSS',
  'Unit 2 - JavaScript and React',
  'Unit 3 - SQL and JDBC',
  'Unit 4 - Spring Boot Part 1',
  'Unit 5 - Spring Boot Part 2',
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState('All');

  // Form state for adding new question
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    unit: 'Unit 1 - HTML and CSS',
    difficulty: 'Medium',
  });

  // Check session storage on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('quizforge_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchQuestions();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await adminLogin(passwordInput);
      setIsAuthenticated(true);
      sessionStorage.setItem('quizforge_admin_auth', 'true');
      fetchQuestions();
    } catch (err) {
      setLoginError('Invalid administrator password. Try: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('quizforge_admin_auth');
    setPasswordInput('');
  };

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGetAllQuestions();
      setQuestions(data || []);
    } catch (err) {
      setError('Failed to load questions from database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete question ID #${id}?`)) {
      return;
    }
    try {
      await adminDeleteQuestion(id);
      setMessage(`Question #${id} successfully deleted.`);
      setTimeout(() => setMessage(''), 3000);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      setError('Failed to delete question.');
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const saved = await adminAddQuestion(newQuestion);
      setMessage('New question added to database successfully.');
      setTimeout(() => setMessage(''), 3000);
      setQuestions((prev) => [...prev, saved]);
      setShowAddModal(false);
      // Reset form
      setNewQuestion({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        unit: 'Unit 1 - HTML and CSS',
        difficulty: 'Medium',
      });
    } catch (err) {
      setError(err.message || 'Failed to add question');
    }
  };

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toString().includes(searchQuery);
    const matchesUnit = unitFilter === 'All' || q.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-lock-icon">
              <Lock size={24} />
            </div>
            <h2>Admin Portal</h2>
            <p>Enter the administrator password to manage course questions.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="admin-pass">Password</label>
              <input
                id="admin-pass"
                type="password"
                placeholder="Enter password (e.g. admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="admin-input"
                autoFocus
              />
            </div>

            {loginError && <p className="admin-error-text">{loginError}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <button className="admin-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Return to Quiz
          </button>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="admin-dashboard">
      <div className="admin-header-row">
        <div>
          <button className="admin-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Application
          </button>
          <h1 className="admin-title">Question Bank Management</h1>
          <p className="admin-subtitle">
            View, search, create, and delete questions from the course database.
          </p>
        </div>

        <div className="admin-actions-top">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Add New Question
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Notifications */}
      {message && (
        <div className="admin-alert success">
          <CheckCircle size={18} />
          {message}
        </div>
      )}
      {error && (
        <div className="admin-alert error">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Stats bar */}
      <div className="admin-stats-strip">
        <div className="admin-stat-item">
          <span className="stat-num">{questions.length}</span>
          <span className="stat-desc">Total Questions in Database</span>
        </div>
        <div className="admin-stat-item">
          <span className="stat-num">{filteredQuestions.length}</span>
          <span className="stat-desc">Filtered Results</span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="admin-controls-card">
        <div className="admin-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search questions by text or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-filter-group">
          <label>Filter Unit:</label>
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="admin-select"
          >
            <option value="All">All Units</option>
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-loading">Loading questions...</div>
        ) : filteredQuestions.length === 0 ? (
          <div className="admin-empty">No questions found matching criteria.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th style={{ width: '180px' }}>Unit</th>
                <th style={{ width: '90px' }}>Difficulty</th>
                <th>Question & Options</th>
                <th style={{ width: '90px' }}>Correct</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="col-id">#{q.id}</td>
                  <td>
                    <span className="unit-box">{q.unit}</span>
                  </td>
                  <td>
                    <span className={`diff-box ${q.difficulty?.toLowerCase()}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td>
                    <div className="q-table-text">{q.questionText}</div>
                    <div className="q-table-options">
                      <span className={`opt-item ${q.correctAnswer === 'A' ? 'opt-correct' : ''}`}>
                        <strong>A:</strong> {q.optionA}
                      </span>
                      <span className={`opt-item ${q.correctAnswer === 'B' ? 'opt-correct' : ''}`}>
                        <strong>B:</strong> {q.optionB}
                      </span>
                      <span className={`opt-item ${q.correctAnswer === 'C' ? 'opt-correct' : ''}`}>
                        <strong>C:</strong> {q.optionC}
                      </span>
                      <span className={`opt-item ${q.correctAnswer === 'D' ? 'opt-correct' : ''}`}>
                        <strong>D:</strong> {q.optionD}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="correct-badge">Option {q.correctAnswer}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-delete"
                      title="Delete question"
                      onClick={() => handleDelete(q.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h2>Add New Question</h2>
              <button
                className="btn-close"
                onClick={() => setShowAddModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="modal-body">
              <div className="form-group">
                <label>Question Text *</label>
                <textarea
                  required
                  rows="3"
                  className="admin-input"
                  placeholder="Enter the question statement..."
                  value={newQuestion.questionText}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, questionText: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Course Unit *</label>
                  <select
                    className="admin-select"
                    value={newQuestion.unit}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, unit: e.target.value })
                    }
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Difficulty *</label>
                  <select
                    className="admin-select"
                    value={newQuestion.difficulty}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, difficulty: e.target.value })
                    }
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid-options">
                <div className="form-group">
                  <label>Option A *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={newQuestion.optionA}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, optionA: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Option B *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={newQuestion.optionB}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, optionB: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Option C *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={newQuestion.optionC}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, optionC: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Option D *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={newQuestion.optionD}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, optionD: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correct Answer *</label>
                <select
                  className="admin-select"
                  value={newQuestion.correctAnswer}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                  }
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

