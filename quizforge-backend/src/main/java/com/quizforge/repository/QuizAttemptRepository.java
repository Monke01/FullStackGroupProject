package com.quizforge.repository;

import com.quizforge.entity.Player;
import com.quizforge.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByPlayerOrderByAttemptedAtDesc(Player player);
    List<QuizAttempt> findTop5ByPlayerOrderByAttemptedAtDesc(Player player);
}
