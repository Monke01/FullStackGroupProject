package com.quizforge.dto;

import java.util.List;

public class QuizResultResponse {

    private int score;
    private int totalQuestions;
    private int correctAnswers;
    private double percentage;
    private String message;
    private List<AnswerReview> reviews;

    public QuizResultResponse() {
    }

    public QuizResultResponse(int score, int totalQuestions, int correctAnswers,
                               double percentage, String message, List<AnswerReview> reviews) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.percentage = percentage;
        this.message = message;
        this.reviews = reviews;
    }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<AnswerReview> getReviews() { return reviews; }
    public void setReviews(List<AnswerReview> reviews) { this.reviews = reviews; }
}
