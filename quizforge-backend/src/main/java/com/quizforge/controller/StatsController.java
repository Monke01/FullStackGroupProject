package com.quizforge.controller;

import com.quizforge.dto.StatsOverview;
import com.quizforge.repository.QuestionRepository;
import com.quizforge.repository.QuizAttemptRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public StatsController(QuestionRepository questionRepository, QuizAttemptRepository quizAttemptRepository) {
        this.questionRepository = questionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @GetMapping("/overview")
    public ResponseEntity<StatsOverview> getOverview() {
        long totalQuestions = questionRepository.count();
        long totalAttempts = quizAttemptRepository.count();
        return ResponseEntity.ok(new StatsOverview(totalQuestions, totalAttempts));
    }
}
