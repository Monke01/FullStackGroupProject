package com.quizforge.dto;

import java.util.List;

public class QuizSubmitRequest {

    private Long playerId;
    private List<AnswerSubmission> answers;

    public QuizSubmitRequest() {
    }

    public QuizSubmitRequest(Long playerId, List<AnswerSubmission> answers) {
        this.playerId = playerId;
        this.answers = answers;
    }

    public Long getPlayerId() { return playerId; }
    public void setPlayerId(Long playerId) { this.playerId = playerId; }

    public List<AnswerSubmission> getAnswers() { return answers; }
    public void setAnswers(List<AnswerSubmission> answers) { this.answers = answers; }
}
