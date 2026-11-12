package com.quizforge.controller;

import com.quizforge.dto.AttemptSummary;
import com.quizforge.dto.PlayerStatsResponse;
import com.quizforge.entity.Player;
import com.quizforge.entity.QuizAttempt;
import com.quizforge.repository.QuizAttemptRepository;
import com.quizforge.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;
    private final QuizAttemptRepository quizAttemptRepository;

    public PlayerController(PlayerService playerService, QuizAttemptRepository quizAttemptRepository) {
        this.playerService = playerService;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        Player player = playerService.findOrCreatePlayer(username);
        return ResponseEntity.ok(player);
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<PlayerStatsResponse> getPlayerStats(@PathVariable Long id) {
        Player player = playerService.findById(id);
        List<QuizAttempt> allAttempts = quizAttemptRepository.findByPlayerOrderByAttemptedAtDesc(player);
        List<QuizAttempt> recentAttempts = quizAttemptRepository.findTop5ByPlayerOrderByAttemptedAtDesc(player);

        int totalAttempts = allAttempts.size();
        int highestScore = allAttempts.stream().mapToInt(QuizAttempt::getScore).max().orElse(0);
        double avgScore = allAttempts.stream().mapToInt(QuizAttempt::getScore).average().orElse(0);

        List<AttemptSummary> summaries = recentAttempts.stream()
                .map(a -> new AttemptSummary(a.getId(), a.getScore(), a.getTotalQuestions(), a.getAttemptedAt()))
                .collect(Collectors.toList());

        PlayerStatsResponse response = new PlayerStatsResponse(
                player.getUsername(), totalAttempts, highestScore,
                Math.round(avgScore * 100.0) / 100.0, summaries);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/recent-attempts")
    public ResponseEntity<List<AttemptSummary>> getRecentAttempts(@PathVariable Long id) {
        Player player = playerService.findById(id);
        List<QuizAttempt> recent = quizAttemptRepository.findTop5ByPlayerOrderByAttemptedAtDesc(player);

        List<AttemptSummary> summaries = recent.stream()
                .map(a -> new AttemptSummary(a.getId(), a.getScore(), a.getTotalQuestions(), a.getAttemptedAt()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(summaries);
    }
}
