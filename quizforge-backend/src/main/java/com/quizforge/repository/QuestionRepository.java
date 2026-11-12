package com.quizforge.repository;

import com.quizforge.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT * FROM questions ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestions(@Param("limit") int limit);

    @Query(value = "SELECT * FROM questions WHERE unit = :unit ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomByUnit(@Param("unit") String unit, @Param("limit") int limit);

    @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomByDifficulty(@Param("difficulty") String difficulty, @Param("limit") int limit);

    @Query(value = "SELECT * FROM questions WHERE unit = :unit AND difficulty = :difficulty ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomByUnitAndDifficulty(@Param("unit") String unit, @Param("difficulty") String difficulty, @Param("limit") int limit);

    List<Question> findByUnit(String unit);
}
