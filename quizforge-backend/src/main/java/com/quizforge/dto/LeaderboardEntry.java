package com.quizforge.dto;

public class LeaderboardEntry {

    private int rank;
    private String username;
    private int totalAttempts;
    private int highestScore;
    private double avgScore;
    private int totalPoints;

    public LeaderboardEntry() {
    }

    public LeaderboardEntry(int rank, String username, int totalAttempts,
                            int highestScore, double avgScore, int totalPoints) {
        this.rank = rank;
        this.username = username;
        this.totalAttempts = totalAttempts;
        this.highestScore = highestScore;
        this.avgScore = avgScore;
        this.totalPoints = totalPoints;
    }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public int getTotalAttempts() { return totalAttempts; }
    public void setTotalAttempts(int totalAttempts) { this.totalAttempts = totalAttempts; }

    public int getHighestScore() { return highestScore; }
    public void setHighestScore(int highestScore) { this.highestScore = highestScore; }

    public double getAvgScore() { return avgScore; }
    public void setAvgScore(double avgScore) { this.avgScore = avgScore; }

    public int getTotalPoints() { return totalPoints; }
    public void setTotalPoints(int totalPoints) { this.totalPoints = totalPoints; }
}
