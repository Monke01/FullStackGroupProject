package com.quizforge.service;

import com.quizforge.entity.Player;
import com.quizforge.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player findOrCreatePlayer(String username) {
        Optional<Player> existing = playerRepository.findByUsername(username);
        if (existing.isPresent()) {
            return existing.get();
        }
        Player player = new Player(username, LocalDateTime.now());
        return playerRepository.save(player);
    }

    public Player findById(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));
    }
}
