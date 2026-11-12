package com.quizforge.controller;

import com.quizforge.dto.QuestionDTO;
import com.quizforge.dto.QuizResultResponse;
import com.quizforge.dto.QuizSubmitRequest;
import com.quizforge.entity.Question;
import com.quizforge.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/start")
    public ResponseEntity<List<QuestionDTO>> startQuiz(
            @RequestParam(defaultValue = "all") String unit,
            @RequestParam(defaultValue = "Mixed") String difficulty) {

        List<Question> questions = quizService.getQuestions(unit, difficulty);

        // Map to DTO (no correctAnswer exposed)
        List<QuestionDTO> dtos = questions.stream()
                .map(q -> new QuestionDTO(q.getId(), q.getQuestionText(),
                        q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD(),
                        q.getUnit(), q.getDifficulty()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(@RequestBody QuizSubmitRequest request) {
        QuizResultResponse result = quizService.submitQuiz(request.getPlayerId(), request.getAnswers());
        return ResponseEntity.ok(result);
    }
}
