package com.quizforge.service;

import com.quizforge.dto.*;
import com.quizforge.entity.*;
import com.quizforge.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final PlayerRepository playerRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAnswerRepository quizAnswerRepository;

    public QuizService(QuestionRepository questionRepository, PlayerRepository playerRepository,
                       QuizAttemptRepository quizAttemptRepository, QuizAnswerRepository quizAnswerRepository) {
        this.questionRepository = questionRepository;
        this.playerRepository = playerRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAnswerRepository = quizAnswerRepository;
    }

    // Get 10 random questions based on unit and difficulty filters
    public List<Question> getQuestions(String unit, String difficulty) {
        boolean unitAll = (unit == null || unit.isEmpty() || unit.equalsIgnoreCase("all"));
        boolean diffMixed = (difficulty == null || difficulty.isEmpty() || difficulty.equalsIgnoreCase("Mixed"));

        if (unitAll && diffMixed) {
            return questionRepository.findRandomQuestions(10);
        } else if (!unitAll && diffMixed) {
            return questionRepository.findRandomByUnit(unit, 10);
        } else if (unitAll) {
            return questionRepository.findRandomByDifficulty(difficulty, 10);
        } else {
            return questionRepository.findRandomByUnitAndDifficulty(unit, difficulty, 10);
        }
    }

    // Submit quiz answers, compute score, save attempt and answers, return result
    public QuizResultResponse submitQuiz(Long playerId, List<AnswerSubmission> answers) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + playerId));

        int correctCount = 0;
        List<AnswerReview> reviews = new ArrayList<>();

        for (AnswerSubmission ans : answers) {
            Question question = questionRepository.findById(ans.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + ans.getQuestionId()));

            boolean isCorrect = question.getCorrectAnswer().equalsIgnoreCase(ans.getSelectedAnswer());
            if (isCorrect) {
                correctCount++;
            }

            AnswerReview review = new AnswerReview(
                    question.getId(),
                    question.getQuestionText(),
                    question.getOptionA(),
                    question.getOptionB(),
                    question.getOptionC(),
                    question.getOptionD(),
                    ans.getSelectedAnswer(),
                    question.getCorrectAnswer(),
                    isCorrect
            );
            reviews.add(review);
        }

        // Save the quiz attempt
        QuizAttempt attempt = new QuizAttempt(player, correctCount, answers.size(), correctCount, LocalDateTime.now());
        quizAttemptRepository.save(attempt);

        // Save individual answers
        for (int i = 0; i < answers.size(); i++) {
            AnswerSubmission ans = answers.get(i);
            Question question = questionRepository.findById(ans.getQuestionId()).orElse(null);
            boolean isCorrect = reviews.get(i).isCorrect();
            QuizAnswer quizAnswer = new QuizAnswer(attempt, question, ans.getSelectedAnswer(), isCorrect);
            quizAnswerRepository.save(quizAnswer);
        }

        double percentage = (answers.size() > 0) ? ((double) correctCount / answers.size()) * 100 : 0;
        String message = getResultMessage(percentage);

        return new QuizResultResponse(correctCount, answers.size(), correctCount, percentage, message, reviews);
    }

    private String getResultMessage(double percentage) {
        if (percentage >= 90) return "Excellent! Outstanding performance!";
        if (percentage >= 70) return "Great job! Keep it up!";
        if (percentage >= 50) return "Good effort! Room for improvement.";
        return "Keep practicing! You'll get better!";
    }
}
