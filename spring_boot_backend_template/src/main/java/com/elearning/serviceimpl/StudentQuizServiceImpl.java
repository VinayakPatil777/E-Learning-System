package com.elearning.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.elearning.dtos.QuizQuestionWithOptionsDTO;
import com.elearning.entity.QuizQuestion;
import com.elearning.repository.QuizOptionRepository;
import com.elearning.repository.QuizQuestionRepository;
import com.elearning.repository.QuizRepository;
import com.elearning.service.StudentQuizService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentQuizServiceImpl implements StudentQuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;
    private final QuizRepository quizRepository;

    // ============================
    // GET QUESTIONS BY QUIZ ID
    // ============================
    @Override
    public List<QuizQuestionWithOptionsDTO> getQuizQuestions(Long quizId) {

        List<QuizQuestion> questions =
                quizQuestionRepository.findByQuiz_QuizId(quizId);

        return questions.stream().map(question ->
                new QuizQuestionWithOptionsDTO(
                        question.getQuestionId(),
                        question.getQuestionText(),
                        quizOptionRepository
                                .findByQuestion_QuestionId(question.getQuestionId())
                                .stream()
                                .map(option ->
                                        new QuizQuestionWithOptionsDTO.OptionDTO(
                                                option.getOptionId(),
                                                option.getText()
                                        )
                                )
                                .toList()
                )
        ).toList();
    }

    // ============================
    // GET QUIZ ID BY COURSE ID
    // ============================
    @Override
    public Long getQuizIdByCourse(Long courseId) {
        return quizRepository
                .findByCourse_CourseId(courseId)
                .orElseThrow(() -> new RuntimeException("Quiz not found for course"))
                .getQuizId();
    }
}
