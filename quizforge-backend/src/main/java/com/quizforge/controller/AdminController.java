package com.quizforge.controller;

import com.quizforge.entity.Question;
import com.quizforge.repository.QuestionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final QuestionRepository questionRepository;
    private static final String ADMIN_PASSWORD = "admin123";

    public AdminController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // Admin login verification
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String password = body.get("password");
        Map<String, Object> response = new HashMap<>();
        if (ADMIN_PASSWORD.equals(password)) {
            response.put("success", true);
            response.put("message", "Authentication successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid admin password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Get all questions with answers
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    // Add a new question
    @PostMapping("/questions")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {
        if (question.getQuestionText() == null || question.getQuestionText().trim().isEmpty() ||
            question.getOptionA() == null || question.getOptionB() == null ||
            question.getOptionC() == null || question.getOptionD() == null ||
            question.getCorrectAnswer() == null || question.getUnit() == null) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "All fields are required");
            return ResponseEntity.badRequest().body(err);
        }
        question.setCorrectAnswer(question.getCorrectAnswer().trim().toUpperCase());
        Question saved = questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Delete a question
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Map<String, String>> deleteQuestion(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        if (!questionRepository.existsById(id)) {
            response.put("error", "Question not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        questionRepository.deleteById(id);
        response.put("message", "Question deleted successfully");
        return ResponseEntity.ok(response);
    }
}

