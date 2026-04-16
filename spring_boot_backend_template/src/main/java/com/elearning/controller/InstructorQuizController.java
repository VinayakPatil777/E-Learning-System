package com.elearning.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.elearning.dtos.QuizQuestionRequestDTO;
import com.elearning.dtos.QuizQuestionResponseDTO;
import com.elearning.dtos.QuizQuestionWithOptionsDTO;
import com.elearning.dtos.QuizRequestDTO;
import com.elearning.dtos.QuizResponseDTO;
import com.elearning.service.QuizQuestionService;
import com.elearning.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/instructor/quiz")
@RequiredArgsConstructor
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorQuizController {

    private final QuizService quizService;
    private final QuizQuestionService quizQuestionService;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<QuizResponseDTO> getQuizByCourse(
            @PathVariable Long courseId) {

        return ResponseEntity.ok(
                quizService.getQuizByCourse(courseId)
        );
    }

    @PostMapping("/create/{courseId}")
    public ResponseEntity<QuizResponseDTO> createQuiz(
            @PathVariable Long courseId,
            @RequestBody QuizRequestDTO dto) {

        return ResponseEntity.ok(
                quizService.createQuizForCourse(courseId, dto.getTitle())
        );
    }

    @PostMapping("/question")
    public ResponseEntity<QuizQuestionResponseDTO> addQuestion(
            @RequestBody QuizQuestionRequestDTO dto) {

        return ResponseEntity.ok(
                quizQuestionService.addQuestion(dto)
        );
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<QuizQuestionWithOptionsDTO>> getQuestions(
            @PathVariable Long quizId) {

        return ResponseEntity.ok(
                quizService.getQuestionsByQuiz(quizId)
        );
    }
}
