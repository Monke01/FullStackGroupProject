import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import './Result.css';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, username, playerId, unit, difficulty } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const {
    score = 0,
    totalQuestions = 10,
    correctAnswers = 0,
    percentage = 0,
    message = '',
    reviews = []
  } = result;

  const incorrectAnswers = totalQuestions - correctAnswers;

  const handlePlayAgain = () => {
    navigate('/quiz', {
      state: {
        playerId,
        username,
        unit,
        difficulty
      }
    });
  };

  return (
    <div className="result-container">
      {/* Summary Card */}
      <div className="result-summary-card">
        <div className="result-header">
          <div>
            <span className="exam-tag">Evaluation Complete</span>
            <h1 className="result-title">Performance Summary</h1>
            <p className="student-label">Candidate: <strong>{username}</strong></p>
          </div>
          <div className="score-box-main">
            <span className="score-val">{score} / {totalQuestions}</span>
            <span className="score-pct">{Math.round(percentage)}% Score</span>
          </div>
        </div>

        <div className="performance-note">
          <p className="message-text">{message}</p>
        </div>

        {/* Breakdown Metrics */}
        <div className="metrics-row">
          <div className="metric-cell">
            <span className="metric-title">Correct Answers</span>
            <span className="metric-number text-green">{correctAnswers}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-title">Incorrect Answers</span>
            <span className="metric-number text-red">{incorrectAnswers}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-title">Points Awarded</span>
            <span className="metric-number">{score * 10} pts</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="result-actions">
          <button className="btn btn-primary" onClick={handlePlayAgain}>
            <RotateCcw size={16} /> Retake Assessment
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/leaderboard')}>
            <Trophy size={16} /> View Leaderboard
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Return to Home
          </button>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="review-section">
        <h2 className="review-heading">Detailed Question Review</h2>

        <div className="review-list">
          {reviews.map((rev, idx) => {
            const isCorrect = rev.correct;
            const optionsMap = [
              { key: 'A', text: rev.optionA },
              { key: 'B', text: rev.optionB },
              { key: 'C', text: rev.optionC },
              { key: 'D', text: rev.optionD }
            ];

            return (
              <div
                key={rev.questionId || idx}
                className={`review-card ${isCorrect ? 'is-correct' : 'is-wrong'}`}
              >
                <div className="review-card-top">
                  <span className="q-label">Question {idx + 1}</span>
                  <div className="status-label">
                    {isCorrect ? (
                      <span className="badge-status correct">
                        <CheckCircle2 size={14} /> Correct
                      </span>
                    ) : (
                      <span className="badge-status wrong">
                        <XCircle size={14} /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <p className="review-question-text">{rev.questionText}</p>

                <div className="review-options">
                  {optionsMap.map(opt => {
                    const isSelected = rev.selectedAnswer === opt.key;
                    const isActualCorrect = rev.correctAnswer === opt.key;

                    let optStyle = 'rev-option';
                    if (isActualCorrect) optStyle += ' actual-ans';
                    else if (isSelected && !isCorrect) optStyle += ' user-ans';

                    return (
                      <div key={opt.key} className={optStyle}>
                        <span className="rev-badge">{opt.key}</span>
                        <span className="rev-text">{opt.text}</span>
                        {isActualCorrect && <span className="tag-pill tag-green">Correct Answer</span>}
                        {isSelected && !isActualCorrect && <span className="tag-pill tag-red">Your Selection</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
