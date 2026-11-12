package com.quizforge.dto;

public class StatsOverview {

    private long totalQuestions;
    private long totalAttempts;

    public StatsOverview() {
    }

    public StatsOverview(long totalQuestions, long totalAttempts) {
        this.totalQuestions = totalQuestions;
        this.totalAttempts = totalAttempts;
    }

    public long getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(long totalQuestions) { this.totalQuestions = totalQuestions; }

    public long getTotalAttempts() { return totalAttempts; }
    public void setTotalAttempts(long totalAttempts) { this.totalAttempts = totalAttempts; }
}
