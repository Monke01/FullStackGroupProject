package com.quizforge.controller;

import com.quizforge.dto.LeaderboardEntry;
import com.quizforge.service.LeaderboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard() {
        return ResponseEntity.ok(leaderboardService.getLeaderboard());
    }

    @GetMapping("/search")
    public ResponseEntity<List<LeaderboardEntry>> searchLeaderboard(@RequestParam String query) {
        return ResponseEntity.ok(leaderboardService.searchLeaderboard(query));
    }
}
