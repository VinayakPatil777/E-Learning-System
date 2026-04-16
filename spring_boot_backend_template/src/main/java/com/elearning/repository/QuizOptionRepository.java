package com.elearning.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elearning.entity.QuizOption;

public interface QuizOptionRepository extends JpaRepository<QuizOption, Long> {

    List<QuizOption> findByQuestion_QuestionId(Long questionId);
}
