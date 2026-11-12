import { FALLBACK_QUESTIONS } from './fallbackData';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Helper: Local fallback storage for demo / GitHub Pages static hosting
const getLocalStore = (key, fallback = []) => {
  try {
    const val = localStorage.getItem(`qf_${key}`);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocalStore = (key, data) => {
  try {
    localStorage.setItem(`qf_${key}`, JSON.stringify(data));
  } catch (e) {}
};

// Create or get player
export async function createOrGetPlayer(username) {
  try {
    const response = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    if (response.ok) return await response.json();
  } catch (e) {
    // Fallback mode
  }

  // Local fallback
  const players = getLocalStore('players', []);
  let player = players.find(p => p.username.toLowerCase() === username.toLowerCase());
  if (!player) {
    player = { id: Date.now(), username, createdAt: new Date().toISOString() };
    players.push(player);
    setLocalStore('players', players);
  }
  return player;
}

// Get quiz questions
export async function getQuizQuestions(unit, difficulty) {
  try {
    const params = new URLSearchParams();
    if (unit) params.append('unit', unit);
    if (difficulty) params.append('difficulty', difficulty);
    const response = await fetch(`${BASE_URL}/quiz/start?${params.toString()}`);
    if (response.ok) return await response.json();
  } catch (e) {
    // Fallback mode
  }

  // Local fallback: select 10 filtered & shuffled questions without exposing correctAnswer
  let pool = [...FALLBACK_QUESTIONS];
  if (unit && unit !== 'All Units') {
    pool = pool.filter(q => q.unit.toLowerCase().includes(unit.toLowerCase()));
  }
  if (difficulty && difficulty !== 'Mixed') {
    pool = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (pool.length < 10) pool = [...FALLBACK_QUESTIONS];

  const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
  return shuffled.map(({ correctAnswer, ...safe }) => safe);
}

// Submit quiz answers
export async function submitQuiz(playerId, answers) {
  try {
    const response = await fetch(`${BASE_URL}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, answers }),
    });
    if (response.ok) return await response.json();
  } catch (e) {
    // Fallback mode
  }

  // Local fallback score calculation
  let correctCount = 0;
  const reviews = answers.map(ans => {
    const q = FALLBACK_QUESTIONS.find(item => item.id === ans.questionId) || {};
    const isCorrect = q.correctAnswer === ans.selectedAnswer;
    if (isCorrect) correctCount++;
    return {
      questionId: q.id,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      selectedAnswer: ans.selectedAnswer,
      correctAnswer: q.correctAnswer,
      correct: isCorrect,
    };
  });

  const percentage = (correctCount / (answers.length || 10)) * 100;
  const message = percentage >= 80 ? 'Outstanding academic performance!' : percentage >= 50 ? 'Satisfactory attempt, review weak concepts.' : 'Revision recommended for core units.';

  // Save attempt locally
  const attempts = getLocalStore('attempts', []);
  attempts.unshift({
    id: Date.now(),
    playerId,
    score: correctCount,
    totalQuestions: answers.length || 10,
    attemptedAt: new Date().toISOString(),
  });
  setLocalStore('attempts', attempts);

  return {
    score: correctCount,
    totalQuestions: answers.length || 10,
    correctAnswers: correctCount,
    percentage,
    message,
    reviews,
  };
}

// Get leaderboard
export async function getLeaderboard() {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard`);
    if (response.ok) return await response.json();
  } catch (e) {
    // Fallback mode
  }

  const players = getLocalStore('players', [{ id: 1, username: 'Aaditya' }, { id: 2, username: 'Arvind' }]);
  const attempts = getLocalStore('attempts', [
    { playerId: 1, score: 9, totalQuestions: 10 },
    { playerId: 1, score: 8, totalQuestions: 10 },
    { playerId: 2, score: 7, totalQuestions: 10 }
  ]);

  return players.map((p, idx) => {
    const pAttempts = attempts.filter(a => a.playerId === p.id);
    const totalAttempts = pAttempts.length;
    const highestScore = pAttempts.reduce((max, a) => Math.max(max, a.score), 0);
    const totalPoints = pAttempts.reduce((sum, a) => sum + (a.score * 10), 0);
    const avgScore = totalAttempts > 0 ? (pAttempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts) : 0;
    return {
      rank: idx + 1,
      username: p.username,
      totalAttempts,
      highestScore,
      avgScore,
      totalPoints,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints || b.highestScore - a.highestScore)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));
}

// Search leaderboard
export async function searchLeaderboard(query) {
  const all = await getLeaderboard();
  return all.filter(item => item.username.toLowerCase().includes(query.toLowerCase()));
}

// Get player stats
export async function getPlayerStats(playerId) {
  try {
    const response = await fetch(`${BASE_URL}/players/${playerId}/stats`);
    if (response.ok) return await response.json();
  } catch (e) {}

  const attempts = getLocalStore('attempts', []).filter(a => a.playerId === playerId);
  const totalAttempts = attempts.length;
  const highestScore = attempts.reduce((max, a) => Math.max(max, a.score), 0);
  const avgScore = totalAttempts > 0 ? (attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts) : 0;
  return {
    totalAttempts,
    highestScore,
    avgScore,
  };
}

// Get recent attempts
export async function getRecentAttempts(playerId) {
  try {
    const response = await fetch(`${BASE_URL}/players/${playerId}/recent-attempts`);
    if (response.ok) return await response.json();
  } catch (e) {}

  return getLocalStore('attempts', []).filter(a => a.playerId === playerId).slice(0, 5);
}

// Get stats overview
export async function getStatsOverview() {
  try {
    const response = await fetch(`${BASE_URL}/stats/overview`);
    if (response.ok) return await response.json();
  } catch (e) {}

  const attempts = getLocalStore('attempts', []);
  return {
    totalQuestions: FALLBACK_QUESTIONS.length,
    totalAttempts: attempts.length || 4,
  };
}

// Admin Login
export async function adminLogin(password) {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (response.ok) return await response.json();
  } catch (e) {}

  if (password === 'admin123') {
    return { success: true };
  }
  throw new Error('Invalid credentials');
}

// Admin get questions
export async function adminGetAllQuestions() {
  try {
    const response = await fetch(`${BASE_URL}/admin/questions`);
    if (response.ok) return await response.json();
  } catch (e) {}

  return FALLBACK_QUESTIONS;
}

// Admin add question
export async function adminAddQuestion(questionData) {
  try {
    const response = await fetch(`${BASE_URL}/admin/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData),
    });
    if (response.ok) return await response.json();
  } catch (e) {}

  const newQ = { id: Date.now(), ...questionData };
  FALLBACK_QUESTIONS.push(newQ);
  return newQ;
}

// Admin delete question
export async function adminDeleteQuestion(id) {
  try {
    const response = await fetch(`${BASE_URL}/admin/questions/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) return await response.json();
  } catch (e) {}

  const idx = FALLBACK_QUESTIONS.findIndex(q => q.id === id);
  if (idx !== -1) FALLBACK_QUESTIONS.splice(idx, 1);
  return { message: 'Question deleted' };
}
