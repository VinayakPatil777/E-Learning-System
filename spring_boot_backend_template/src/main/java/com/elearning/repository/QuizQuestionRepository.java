package com.elearning.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elearning.entity.QuizQuestion;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findByQuiz_QuizId(Long quizId);
}
