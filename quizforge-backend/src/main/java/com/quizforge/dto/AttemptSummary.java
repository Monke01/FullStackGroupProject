package com.quizforge.dto;

import java.time.LocalDateTime;

public class AttemptSummary {

    private Long id;
    private int score;
    private int totalQuestions;
    private LocalDateTime attemptedAt;

    public AttemptSummary() {
    }

    public AttemptSummary(Long id, int score, int totalQuestions, LocalDateTime attemptedAt) {
        this.id = id;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.attemptedAt = attemptedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public LocalDateTime getAttemptedAt() { return attemptedAt; }
    public void setAttemptedAt(LocalDateTime attemptedAt) { this.attemptedAt = attemptedAt; }
}
