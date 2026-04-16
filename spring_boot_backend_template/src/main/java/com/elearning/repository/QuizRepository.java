package com.elearning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elearning.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Optional<Quiz> findByCourse_CourseId(Long courseId);
    
    void deleteByCourse_CourseId(Long courseId);
}





