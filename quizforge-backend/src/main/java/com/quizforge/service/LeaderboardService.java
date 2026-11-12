package com.quizforge.service;

import com.quizforge.dto.LeaderboardEntry;
import com.quizforge.entity.Player;
import com.quizforge.entity.QuizAttempt;
import com.quizforge.repository.PlayerRepository;
import com.quizforge.repository.QuizAttemptRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final PlayerRepository playerRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public LeaderboardService(PlayerRepository playerRepository, QuizAttemptRepository quizAttemptRepository) {
        this.playerRepository = playerRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public List<LeaderboardEntry> getLeaderboard() {
        List<Player> players = playerRepository.findAll();
        return buildLeaderboard(players);
    }

    public List<LeaderboardEntry> searchLeaderboard(String query) {
        List<Player> players = playerRepository.findAll().stream()
                .filter(p -> p.getUsername().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
        return buildLeaderboard(players);
    }

    private List<LeaderboardEntry> buildLeaderboard(List<Player> players) {
        List<LeaderboardEntry> entries = new ArrayList<>();

        for (Player player : players) {
            List<QuizAttempt> attempts = quizAttemptRepository.findByPlayerOrderByAttemptedAtDesc(player);
            if (attempts.isEmpty()) continue;

            int totalAttempts = attempts.size();
            int highestScore = attempts.stream().mapToInt(QuizAttempt::getScore).max().orElse(0);
            double avgScore = attempts.stream().mapToInt(QuizAttempt::getScore).average().orElse(0);
            int totalPoints = attempts.stream().mapToInt(QuizAttempt::getScore).sum();

            LeaderboardEntry entry = new LeaderboardEntry(0, player.getUsername(),
                    totalAttempts, highestScore, Math.round(avgScore * 100.0) / 100.0, totalPoints);
            entries.add(entry);
        }

        // Sort by totalPoints desc, then highestScore desc
        entries.sort(Comparator.comparingInt(LeaderboardEntry::getTotalPoints).reversed()
                .thenComparing(Comparator.comparingInt(LeaderboardEntry::getHighestScore).reversed()));

        // Assign ranks
        for (int i = 0; i < entries.size(); i++) {
            entries.get(i).setRank(i + 1);
        }

        return entries;
    }
}
