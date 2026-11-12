package com.quizforge.dto;

import java.util.List;

public class PlayerStatsResponse {

    private String username;
    private int totalAttempts;
    private int highestScore;
    private double avgScore;
    private List<AttemptSummary> recentAttempts;

    public PlayerStatsResponse() {
    }

    public PlayerStatsResponse(String username, int totalAttempts, int highestScore,
                                double avgScore, List<AttemptSummary> recentAttempts) {
        this.username = username;
        this.totalAttempts = totalAttempts;
        this.highestScore = highestScore;
        this.avgScore = avgScore;
        this.recentAttempts = recentAttempts;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public int getTotalAttempts() { return totalAttempts; }
    public void setTotalAttempts(int totalAttempts) { this.totalAttempts = totalAttempts; }

    public int getHighestScore() { return highestScore; }
    public void setHighestScore(int highestScore) { this.highestScore = highestScore; }

    public double getAvgScore() { return avgScore; }
    public void setAvgScore(double avgScore) { this.avgScore = avgScore; }

    public List<AttemptSummary> getRecentAttempts() { return recentAttempts; }
    public void setRecentAttempts(List<AttemptSummary> recentAttempts) { this.recentAttempts = recentAttempts; }
}
