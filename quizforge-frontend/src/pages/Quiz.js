import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { getQuizQuestions, submitQuiz } from '../services/api';
import './Quiz.css';

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerId, username, unit, difficulty } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // selectedAnswers: map of questionId -> selected option ('A', 'B', 'C', 'D')
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // If accessed directly without player info, redirect to Home
  useEffect(() => {
    if (!playerId) {
      navigate('/', { replace: true });
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getQuizQuestions(unit, difficulty);
        if (!data || data.length === 0) {
          setError('No questions found for the selected criteria.');
        } else {
          setQuestions(data);
        }
      } catch (err) {
        setError('Failed to load quiz questions. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [playerId, unit, difficulty, navigate]);

  if (!playerId) {
    return null;
  }

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="quiz-card quiz-center">
          <div className="simple-spinner"></div>
          <h2>Loading Assessment Questions</h2>
          <p className="quiz-subtitle">Preparing question set from syllabus...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card quiz-center">
          <AlertCircle size={48} className="error-icon" />
          <h2>Unable to Load Quiz</h2>
          <p className="error-message">{error || 'No questions available.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;
  const currentSelected = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionKey
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleOpenSubmitConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    setError('');

    try {
      // Build answers payload: [{questionId, selectedAnswer}]
      const formattedAnswers = questions.map(q => ({
        questionId: q.id,
        selectedAnswer: selectedAnswers[q.id] || ''
      }));

      const result = await submitQuiz(playerId, formattedAnswers);

      navigate('/result', {
        state: {
          result,
          username,
          playerId,
          unit,
          difficulty
        }
      });
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      setSubmitting(false);
    }
  };

  const options = [
    { key: 'A', text: currentQ.optionA },
    { key: 'B', text: currentQ.optionB },
    { key: 'C', text: currentQ.optionC },
    { key: 'D', text: currentQ.optionD }
  ];

  return (
    <div className="quiz-container">
      {/* Top Header / Progress Info */}
      <div className="quiz-header">
        <div className="quiz-meta-info">
          <span className="unit-box">{currentQ.unit || 'Web Development'}</span>
          <span className="diff-box">{currentQ.difficulty || 'Medium'}</span>
        </div>
        <div className="quiz-progress-text">
          Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="quiz-card">
        <div className="question-header">
          <span className="question-badge">Q{currentIndex + 1}</span>
          <h2 className="question-text">{currentQ.questionText}</h2>
        </div>

        {/* Options */}
        <div className="options-grid">
          {options.map((opt) => {
            const isSelected = currentSelected === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opt.key)}
              >
                <span className="option-badge">{opt.key}</span>
                <span className="option-text">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Navigation Buttons */}
        <div className="quiz-nav-row">
          <button
            className="btn btn-secondary nav-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || submitting}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="answered-status">
            Answered: {answeredCount} / {questions.length}
          </span>

          {currentIndex < questions.length - 1 ? (
            <button
              className="btn btn-primary nav-btn"
              onClick={handleNext}
              disabled={submitting}
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              className="btn btn-primary nav-btn submit-btn"
              onClick={handleOpenSubmitConfirm}
              disabled={submitting}
            >
              <CheckCircle size={18} />
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <HelpCircle size={44} className="modal-icon" />
            <h3>Submit Quiz?</h3>
            <p>
              You have answered <strong>{answeredCount}</strong> out of <strong>{questions.length}</strong> questions.
              {answeredCount < questions.length && (
                <span className="unanswered-warning">
                  <br />Note: Unanswered questions will be marked incorrect!
                </span>
              )}
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Review Answers
              </button>
              <button
                className="btn btn-primary"
                onClick={handleFinalSubmit}
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

