const BASE_URL = 'http://localhost:8080/api';

// Create or get a player by username
export async function createOrGetPlayer(username) {
  const response = await fetch(`${BASE_URL}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) throw new Error('Failed to create or get player');
  return response.json();
}

// Get quiz questions by unit and difficulty
export async function getQuizQuestions(unit, difficulty) {
  const params = new URLSearchParams();
  if (unit) params.append('unit', unit);
  if (difficulty) params.append('difficulty', difficulty);
  const response = await fetch(`${BASE_URL}/quiz/start?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch questions');
  return response.json();
}

// Submit quiz answers
export async function submitQuiz(playerId, answers) {
  const response = await fetch(`${BASE_URL}/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId, answers }),
  });
  if (!response.ok) throw new Error('Failed to submit quiz');
  return response.json();
}

// Get leaderboard
export async function getLeaderboard() {
  const response = await fetch(`${BASE_URL}/leaderboard`);
  if (!response.ok) throw new Error('Failed to fetch leaderboard');
  return response.json();
}

// Search leaderboard
export async function searchLeaderboard(query) {
  const response = await fetch(`${BASE_URL}/leaderboard/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search leaderboard');
  return response.json();
}

// Get player stats
export async function getPlayerStats(playerId) {
  const response = await fetch(`${BASE_URL}/players/${playerId}/stats`);
  if (!response.ok) throw new Error('Failed to fetch player stats');
  return response.json();
}

// Get recent attempts for a player
export async function getRecentAttempts(playerId) {
  const response = await fetch(`${BASE_URL}/players/${playerId}/recent-attempts`);
  if (!response.ok) throw new Error('Failed to fetch recent attempts');
  return response.json();
}

// Get stats overview (total questions, total attempts)
export async function getStatsOverview() {
  const response = await fetch(`${BASE_URL}/stats/overview`);
  if (!response.ok) throw new Error('Failed to fetch stats overview');
  return response.json();
}

// Admin: Login
export async function adminLogin(password) {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json();
}

// Admin: Get all questions with answers
export async function adminGetAllQuestions() {
  const response = await fetch(`${BASE_URL}/admin/questions`);
  if (!response.ok) throw new Error('Failed to load questions');
  return response.json();
}

// Admin: Add a new question
export async function adminAddQuestion(questionData) {
  const response = await fetch(`${BASE_URL}/admin/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to add question');
  }
  return response.json();
}

// Admin: Delete a question
export async function adminDeleteQuestion(id) {
  const response = await fetch(`${BASE_URL}/admin/questions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete question');
  return response.json();
}
