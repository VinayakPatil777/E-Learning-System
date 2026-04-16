package com.elearning.service;

import java.util.List;

import com.elearning.dtos.QuizQuestionWithOptionsDTO;
import com.elearning.dtos.QuizResponseDTO;

public interface QuizService {

    QuizResponseDTO createQuizForCourse(Long courseId, String title);

    QuizResponseDTO getQuizByCourse(Long courseId);

    List<QuizQuestionWithOptionsDTO> getQuestionsByQuiz(Long quizId);
}
